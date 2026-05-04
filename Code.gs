const SHEET_NAME   = "Tasks";
const REPORT_SHEET = "Weekly Reports";


function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("SVM Admin")
    .addItem("Generate AI Weekly Report", "generateWeeklyReport")
    .addItem("Setup Sheet (first time only)", "setupSheet")
    .addToUi();
}

function generateWeeklyReport() {
  const ss        = SpreadsheetApp.getActiveSpreadsheet();
  const taskSheet = ss.getSheetByName(SHEET_NAME);

  if (!taskSheet) {
    SpreadsheetApp.getUi().alert("Tasks sheet not found. Please run Setup Sheet first.");
    return;
  }

  let reportSheet = ss.getSheetByName(REPORT_SHEET);
  if (!reportSheet) {
    reportSheet = ss.insertSheet(REPORT_SHEET);
  } else {
    reportSheet.clearContents();
  }

  reportSheet.getRange(1, 1, 1, 4).setValues([
    ["Member Name", "Tasks Done", "Tasks Missed/Late", "AI Performance Summary"]
  ]);
  reportSheet.getRange(1, 1, 1, 4)
    .setBackground("#0f1628")
    .setFontColor("#4f9cf9")
    .setFontWeight("bold");
  reportSheet.setColumnWidth(1, 180);
  reportSheet.setColumnWidth(2, 100);
  reportSheet.setColumnWidth(3, 140);
  reportSheet.setColumnWidth(4, 500);
  reportSheet.setFrozenRows(1);

  const data    = taskSheet.getDataRange().getValues();
  const headers = data[0];

  const col = (name) => headers.indexOf(name);
  const nameIdx   = col("Assigned To");
  const taskIdx   = col("Task Name");
  const typeIdx   = col("Task Type");
  const planIdx   = col("Planned Date");
  const doneIdx   = col("Actual Completion Date");
  const statusIdx = col("Status");
  const scoreIdx  = col("Weekly Score");

  const memberMap = {};
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[nameIdx]) continue;
    const member = row[nameIdx].toString().trim();
    if (!memberMap[member]) {
      memberMap[member] = { done: [], late: [], pending: [] };
    }
    const status = row[statusIdx] ? row[statusIdx].toString().trim() : "";
    const score  = Number(row[scoreIdx]);
    const task   = row[taskIdx] ? row[taskIdx].toString().trim() : "Unnamed Task";
    const type   = row[typeIdx] ? row[typeIdx].toString().trim() : "";

    if (status === "Done" && score >= 0) {
      memberMap[member].done.push(task + " (" + type + ")");
    } else if (status === "Done" && score < 0) {
      memberMap[member].late.push(task + " (" + type + ")");
    } else {
      memberMap[member].pending.push(task + " (" + type + ")");
    }
  }

  const members = Object.keys(memberMap).sort();
  if (members.length === 0) {
    SpreadsheetApp.getUi().alert("No task data found. Add tasks to the Tasks sheet first.");
    return;
  }

  const reportRows = [];
  const weekLabel  = getWeekLabel();

  members.forEach(function(member) {
    const stats    = memberMap[member];
    const doneCount   = stats.done.length;
    const lateCount   = stats.late.length;
    const pendingCount = stats.pending.length;
    const totalDone   = doneCount + lateCount;
    const totalTasks  = totalDone + pendingCount;

    const doneList    = stats.done.length    > 0 ? stats.done.join(", ")    : "None";
    const lateList    = stats.late.length    > 0 ? stats.late.join(", ")    : "None";
    const pendingList = stats.pending.length > 0 ? stats.pending.join(", ") : "None";

    const prompt =
      "You are a school principal at Saraswati Vidyamandir writing a weekly staff performance review.\n\n" +
      "Staff Member: " + member + "\n" +
      "Week: " + weekLabel + "\n" +
      "Tasks completed on time: " + doneList + "\n" +
      "Tasks completed late: " + lateList + "\n" +
      "Tasks not completed: " + pendingList + "\n\n" +
      "Write a professional 2-3 sentence performance summary for this staff member. " +
      "Be specific — mention actual task names. " +
      "Acknowledge good work if tasks were done on time. " +
      "Flag concerns if tasks were late or missed. " +
      "End with one actionable suggestion for next week. " +
      "Do not use bullet points. Do not use greetings or salutations.";

    let summary = "";
    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 150
        }
      };
      const options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      };
      const response = UrlFetchApp.fetch(GEMINI_URL, options);
      const json     = JSON.parse(response.getContentText());
      const text     = json.candidates &&
                       json.candidates[0] &&
                       json.candidates[0].content &&
                       json.candidates[0].content.parts &&
                       json.candidates[0].content.parts[0].text;
      summary = text ? text.trim() : fallbackSummary(member, doneCount, lateCount, pendingCount);
    } catch (e) {
      summary = fallbackSummary(member, doneCount, lateCount, pendingCount);
    }

    reportRows.push([member, doneCount, lateCount + pendingCount, summary]);

    Utilities.sleep(500);
  });

  if (reportRows.length > 0) {
    const dataRange = reportSheet.getRange(2, 1, reportRows.length, 4);
    dataRange.setValues(reportRows);
    dataRange.setWrap(true);
    dataRange.setVerticalAlignment("top");

    reportRows.forEach(function(row, i) {
      const sheetRow  = i + 2;
      const done      = Number(row[1]);
      const missed    = Number(row[2]);
      let bgColor     = "#1a2f1a";
      if (missed > 0 && missed >= done) bgColor = "#2f1a1a";
      else if (missed > 0)              bgColor = "#2f2a1a";
      reportSheet.getRange(sheetRow, 1, 1, 4).setBackground(bgColor).setFontColor("#e8edf5");
    });

    reportSheet.insertRowBefore(1);
    reportSheet.getRange(1, 1, 1, 4)
      .merge()
      .setValue("SVM Weekly Performance Report — " + weekLabel + "   |   Generated by Gemini AI   |   " + new Date().toLocaleString("en-IN"))
      .setBackground("#0a0f1e")
      .setFontColor("#4f9cf9")
      .setFontWeight("bold")
      .setFontSize(11);
  }

  ss.setActiveSheet(reportSheet);
  SpreadsheetApp.getUi().alert(
    "Weekly Report Generated!\n\n" +
    members.length + " staff members analysed by Gemini AI.\n" +
    "Check the \"Weekly Reports\" tab."
  );
}

function fallbackSummary(member, done, late, pending) {
  if (late === 0 && pending === 0) {
    return member + " completed all assigned tasks on time this week. Excellent performance — maintain this consistency next week.";
  }
  if (pending > 0) {
    return member + " has " + pending + " incomplete task(s) this week. " +
           (late > 0 ? late + " task(s) were submitted late. " : "") +
           "Prioritise pending tasks at the start of each day next week.";
  }
  return member + " completed tasks but " + late + " submission(s) were late this week. Aim to submit all tasks before their planned date next week.";
}

function getWeekLabel() {
  const now     = new Date();
  const dow     = now.getDay();
  const diffMon = (dow === 0) ? -6 : 1 - dow;
  const mon     = new Date(now); mon.setDate(now.getDate() + diffMon);
  const sun     = new Date(mon); sun.setDate(mon.getDate() + 6);
  const fmt     = { day: "numeric", month: "short" };
  return mon.toLocaleDateString("en-IN", fmt) + " – " +
         sun.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function doGet(e) {
  const template = HtmlService.createTemplateFromFile("Index");
  return template
    .evaluate()
    .setTitle("SVM Task Manager")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getTasksForMember(memberName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const now = new Date();
  const todayStr = formatDate(now);
  const todayDow = now.getDay();

  const result = { recurring: [], onetime: [] };

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue;

    const rowObj = {};
    headers.forEach((h, idx) => { rowObj[h] = row[idx]; });

    if (!rowObj["Assigned To"] || rowObj["Assigned To"].toString().toLowerCase() !== memberName.toLowerCase()) continue;

    const taskType = rowObj["Task Type"] ? rowObj["Task Type"].toString().trim() : "";
    const status   = rowObj["Status"]    ? rowObj["Status"].toString().trim()    : "";
    const taskId   = rowObj["Task ID"]   ? rowObj["Task ID"].toString().trim()   : "";

    if (status !== "Pending") continue;

    const plannedRaw  = rowObj["Planned Date"];
    const plannedDate = plannedRaw ? new Date(plannedRaw) : null;
    const plannedStr  = plannedDate ? formatDate(plannedDate) : "";

    let shouldShow = false;
    if (taskType === "Daily") {
      shouldShow = true;
    } else if (taskType === "Weekly") {
      shouldShow = plannedDate ? (plannedDate.getDay() === todayDow) : false;
    } else if (taskType === "One-time") {
      shouldShow = (plannedStr === todayStr);
    }

    if (!shouldShow) continue;

    const task = {
      taskId:      taskId,
      rowIndex:    i + 1,
      name:        rowObj["Task Name"] ? rowObj["Task Name"].toString() : "",
      type:        taskType,
      plannedDate: plannedStr,
      status:      status
    };

    if (taskType === "Daily" || taskType === "Weekly") {
      result.recurring.push(task);
    } else {
      result.onetime.push(task);
    }
  }

  return result;
}

function markTaskDone(rowIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  const col = (name) => headers.indexOf(name) + 1;

  const statusCol     = col("Status");
  const completionCol = col("Actual Completion Date");
  const plannedCol    = col("Planned Date");
  const scoreCol      = col("Weekly Score");

  const today   = new Date(); today.setHours(0, 0, 0, 0);
  const planned = new Date(sheet.getRange(rowIndex, plannedCol).getValue());
  planned.setHours(0, 0, 0, 0);

  sheet.getRange(rowIndex, statusCol).setValue("Done");
  sheet.getRange(rowIndex, completionCol).setValue(formatDate(new Date()));

  const score = (today <= planned) ? 1 : -1;
  sheet.getRange(rowIndex, scoreCol).setValue(score);

  return { success: true, score: score };
}

function getWeeklyScore(memberName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const assignedIdx = headers.indexOf("Assigned To");
  const scoreIdx    = headers.indexOf("Weekly Score");
  const statusIdx   = headers.indexOf("Status");

  let total = 0;
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[assignedIdx]) continue;
    if (row[assignedIdx].toString().toLowerCase() !== memberName.toLowerCase()) continue;
    if (row[statusIdx] !== "Done") continue;
    const sc = Number(row[scoreIdx]);
    if (!isNaN(sc)) total += sc;
  }
  return total;
}

function getTeamMembers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const colIdx = headers.indexOf("Assigned To");
  const members = new Set();
  for (let i = 1; i < data.length; i++) {
    const val = data[i][colIdx];
    if (val && val.toString().trim()) members.add(val.toString().trim());
  }
  return [...members].sort();
}

const GEMINI_API_KEY = "AIzaSyDVmcWo9fVQbdgvqRcrme24FXZg1wL_1lE";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
  GEMINI_API_KEY;

function getAISuggestion(tasks) {
  if (!tasks || tasks.length === 0) {
    return "No pending tasks found. You are all clear for today — great work!";
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskLines = tasks.map(function(t) {
      const isOverdue = t.plannedDate && (new Date(t.plannedDate) < today);
      return "- " + t.name + " [" + t.type + "]" + (isOverdue ? " (OVERDUE)" : "");
    }).join("\n");

    const prompt =
      "You are a productivity assistant for Saraswati Vidyamandir, a school in Ambala. " +
      "A staff member has the following pending tasks for today:\n\n" +
      taskLines + "\n\n" +
      "Write a concise, professional daily briefing in exactly 2-3 sentences. " +
      "Tell them which task to prioritise first and why. " +
      "If any task is marked OVERDUE, flag it urgently. " +
      "Be specific — mention the actual task name. " +
      "Do not use bullet points. Do not use greetings. Start directly with the insight.";

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 120
      }
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(GEMINI_URL, options);
    const json = JSON.parse(response.getContentText());

    const text = json.candidates &&
                 json.candidates[0] &&
                 json.candidates[0].content &&
                 json.candidates[0].content.parts &&
                 json.candidates[0].content.parts[0].text;

    if (text && text.trim().length > 0) {
      return text.trim();
    }

    throw new Error("Empty Gemini response");

  } catch (e) {
    const today2 = new Date(); today2.setHours(0, 0, 0, 0);

    const overdue = tasks.filter(function(t) {
      if (!t.plannedDate) return false;
      const d = new Date(t.plannedDate); d.setHours(0, 0, 0, 0);
      return d < today2;
    });

    const onetimeUrgent = tasks.filter(function(t) { return t.type === "One-time"; });
    const dailyTasks    = tasks.filter(function(t) { return t.type === "Daily"; });
    const weeklyTasks   = tasks.filter(function(t) { return t.type === "Weekly"; });
    const totalPending  = tasks.length;

    if (overdue.length > 0) {
      const names = overdue.map(function(t) { return '"' + t.name + '"'; }).join(", ");
      return "AI Insight: " + overdue.length + " overdue task" + (overdue.length > 1 ? "s" : "") +
             " detected — " + names + ". Complete " + (overdue.length > 1 ? "these" : "this") +
             " immediately to recover score points before the day ends.";
    }
    if (onetimeUrgent.length > 0) {
      return 'AI Insight: Start with "' + onetimeUrgent[0].name + '" — it is a one-time task with a fixed deadline today. ' +
             "Completing it first secures your score. Recurring tasks can follow.";
    }
    if (totalPending >= 5) {
      return "AI Insight: " + totalPending + " tasks pending today — a heavy load. Tackle Daily tasks first to lock in base points, then move to Weekly.";
    }
    if (weeklyTasks.length > 0 && dailyTasks.length === 0) {
      return 'AI Insight: Your weekly task "' + weeklyTasks[0].name + '" is due today. Complete it before end of day to keep your score positive.';
    }
    if (dailyTasks.length > 0) {
      return "AI Insight: " + dailyTasks.length + " daily routine task" + (dailyTasks.length > 1 ? "s" : "") +
             " pending. Consistent completions build a strong weekly score.";
    }
    return "AI Insight: " + totalPending + " task" + (totalPending > 1 ? "s" : "") + " remaining. You are on track — keep the streak going.";
  }
}

function formatDate(d) {
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const dy = String(d.getDate()).padStart(2, "0");
  return yr + "-" + mo + "-" + dy;
}

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  const headers = [
    "Task ID",
    "Task Name",
    "Task Type",
    "Assigned To",
    "Planned Date",
    "Actual Completion Date",
    "Status",
    "Weekly Score"
  ];

  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#0f1628")
    .setFontColor("#4f9cf9")
    .setFontWeight("bold");

  sheet.getRange(2, 3, 200, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(["Daily", "Weekly", "One-time"])
      .setAllowInvalid(false).build()
  );

  sheet.getRange(2, 7, 200, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(["Pending", "Done"])
      .setAllowInvalid(false).build()
  );

  sheet.setColumnWidth(1, 70);
  sheet.setColumnWidth(2, 220);
  sheet.setColumnWidth(3, 90);
  sheet.setColumnWidth(4, 150);
  sheet.setColumnWidth(5, 110);
  sheet.setColumnWidth(6, 150);
  sheet.setColumnWidth(7, 80);
  sheet.setColumnWidth(8, 100);
  sheet.setFrozenRows(1);

  const today = formatDate(new Date());
  const sampleData = [
    ["T001", "Morning Assembly Coordination",   "Daily",    "Arjun",       today, "", "Pending", ""],
    ["T002", "Update Student Attendance",        "Daily",    "Arjun",       today, "", "Pending", ""],
    ["T003", "Grade Weekly Science Tests",       "Weekly",   "Arjun",       today, "", "Pending", ""],

    ["T004", "Check Library Book Returns",       "Daily",    "Divya", today, "", "Pending", ""],
    ["T005", "Parent Meeting Preparation",       "One-time", "Divya", today, "", "Pending", ""],

    ["T006", "Fee Collection Reconciliation",   "Weekly",   "Suresh", today, "", "Pending", ""],
    ["T007", "Update Staff Duty Roster",         "One-time", "Suresh", today, "", "Pending", ""],

    ["T008", "Prepare Mid-Term Report Cards",   "One-time", "Lakshmi", today, "", "Pending", ""],
    ["T009", "Monitor Classroom Cleanliness",   "Daily",    "Lakshmi", today, "", "Pending", ""],

    ["T010", "Computer Lab Maintenance Check",  "Weekly",   "Karthik", today, "", "Pending", ""],
    ["T011", "Update Student Portal Records",   "Daily",    "Karthik", today, "", "Pending", ""],

    ["T012", "Coordinate Sports Day Practice",  "Daily",    "Meenakshi", today, "", "Pending", ""],
    ["T013", "Submit Annual Budget Proposal",   "One-time", "Meenakshi", today, "", "Pending", ""],

    ["T014", "Security Round Morning Shift",    "Daily",    "Venkat",    today, "", "Pending", ""],
    ["T015", "Maintenance Log Update",          "Weekly",   "Venkat",    today, "", "Pending", ""],

    ["T016", "Prepare Weekly Newsletter",       "Weekly",   "Priya", today, "", "Pending", ""],
    ["T017", "Staff Meeting Minutes",           "One-time", "Priya", today, "", "Pending", ""],

    ["T018", "Grade English Assignments",       "Daily",    "Rajesh",       today, "", "Pending", ""],
    ["T019", "Conduct Remedial Class",          "Weekly",   "Rajesh",       today, "", "Pending", ""],

    ["T020", "Prepare Lesson Plan",             "Daily",    "Anitha", today, "", "Pending", ""],
    ["T021", "Submit Teaching Aid Request",     "One-time", "Anitha", today, "", "Pending", ""],

    ["T022", "Update Inventory Register",       "Weekly",   "Srinivas",   today, "", "Pending", ""],
    ["T023", "Check Laboratory Equipment",      "Daily",    "Srinivas",   today, "", "Pending", ""],

    ["T024", "Counsel Students on Attendance",  "Weekly",   "Padmavathi", today, "", "Pending", ""],
    ["T025", "Coordinate Annual Day Planning",  "One-time", "Padmavathi", today, "", "Pending", ""]
  ];

  sheet.getRange(2, 1, sampleData.length, headers.length).setValues(sampleData);

  return "Sheet setup complete. Sample data added with Task IDs.";
}