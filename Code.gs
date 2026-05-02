// ============================================================
// SVM Task Management System — Google Apps Script Backend
// ============================================================

const SHEET_NAME = "Tasks";

// ── Entry point for GET requests (serves the web app HTML) ──
function doGet(e) {
  const template = HtmlService.createTemplateFromFile("Index");
  return template
    .evaluate()
    .setTitle("SVM Task Manager")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ── Return tasks for a specific team member and today ──
function getTasksForMember(memberName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const now = new Date();
  const todayStr = formatDate(now);
  const todayDow = now.getDay(); // 0=Sun, 1=Mon ... 6=Sat

  const result = { recurring: [], onetime: [] };

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue; // skip empty rows

    const rowObj = {};
    headers.forEach((h, idx) => { rowObj[h] = row[idx]; });

    if (!rowObj["Assigned To"] || rowObj["Assigned To"].toString().toLowerCase() !== memberName.toLowerCase()) continue;

    const taskType = rowObj["Task Type"] ? rowObj["Task Type"].toString().trim() : "";
    const status   = rowObj["Status"]    ? rowObj["Status"].toString().trim()    : "";
    const taskId   = rowObj["Task ID"]   ? rowObj["Task ID"].toString().trim()   : "";

    if (status !== "Pending") continue;

    // ── FIX: Proper recurrence logic ────────────────────────
    // DAILY   → show every day (no date restriction)
    // WEEKLY  → show only on the same weekday as Planned Date
    // ONE-TIME→ show only on the exact Planned Date
    // ────────────────────────────────────────────────────────
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

// ── Mark a task as Done and write score to sheet ──
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

  // ── FIX: Score — +1 on time, -1 late ──
  const score = (today <= planned) ? 1 : -1;
  sheet.getRange(rowIndex, scoreCol).setValue(score);

  return { success: true, score: score };
}

// ── Weekly score sum for a member ──
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

// ── Get all team members for the selector dropdown ──
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

// ── FIX: Rule-based AI Priority Engine ──────────────────────
// Replaces the broken LanguageApp.model() call.
// Analyses the task list and returns a context-aware insight.
// No external API — works 100% reliably.
// ────────────────────────────────────────────────────────────
function getAISuggestion(tasks) {
  if (!tasks || tasks.length === 0) {
    return "No pending tasks found. You are all clear for today — great work!";
  }

  const today = new Date(); today.setHours(0, 0, 0, 0);

  const overdue = tasks.filter(t => {
    if (!t.plannedDate) return false;
    const d = new Date(t.plannedDate); d.setHours(0, 0, 0, 0);
    return d < today;
  });

  const onetimeUrgent = tasks.filter(t => t.type === "One-time");
  const dailyTasks    = tasks.filter(t => t.type === "Daily");
  const weeklyTasks   = tasks.filter(t => t.type === "Weekly");
  const totalPending  = tasks.length;

  // Priority rules — most critical first
  if (overdue.length > 0) {
    const names = overdue.map(t => '"' + t.name + '"').join(", ");
    return "AI Insight: " + overdue.length + " overdue task" + (overdue.length > 1 ? "s" : "") +
           " detected — " + names + ". Complete " + (overdue.length > 1 ? "these" : "this") +
           " immediately to recover score points before the day ends.";
  }

  if (onetimeUrgent.length > 0) {
    return 'AI Insight: Start with "' + onetimeUrgent[0].name + '" — it is a one-time task with a fixed deadline today. ' +
           "Completing it first secures your score. Recurring tasks can follow.";
  }

  if (totalPending >= 5) {
    return "AI Insight: " + totalPending + " tasks pending today — a heavy load. Tackle Daily tasks first to lock in base " +
           "points, then move to Weekly. Prioritise completion over perfection.";
  }

  if (weeklyTasks.length > 0 && dailyTasks.length === 0) {
    return 'AI Insight: Your weekly task "' + weeklyTasks[0].name + '" is due today. ' +
           "Completing it keeps your weekly score positive — do not leave it for end of day.";
  }

  if (dailyTasks.length > 0) {
    return "AI Insight: " + dailyTasks.length + " daily routine task" + (dailyTasks.length > 1 ? "s" : "") +
           " pending. Consistent daily completions compound into a strong weekly score.";
  }

  return "AI Insight: " + totalPending + " task" + (totalPending > 1 ? "s" : "") +
         " remaining today. You are on track — keep the streak going.";
}

// ── Utility: format Date as YYYY-MM-DD ──
function formatDate(d) {
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const dy = String(d.getDate()).padStart(2, "0");
  return yr + "-" + mo + "-" + dy;
}

// ── One-time setup: creates columns + sample data ──
// Run this ONCE from the Apps Script editor before deploying.
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  // ── FIX: Task ID added as first column ──
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

  // Data validation: Task Type (column 3)
  sheet.getRange(2, 3, 200, 1).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(["Daily", "Weekly", "One-time"])
      .setAllowInvalid(false).build()
  );

  // Data validation: Status (column 7)
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
    ["T001", "Morning Assembly Preparation", "Daily",    "Rajesh Kumar", today, "", "Pending", ""],
    ["T002", "Update Student Attendance",    "Daily",    "Priya Sharma", today, "", "Pending", ""],
    ["T003", "Grade Weekly Tests",           "Weekly",   "Rajesh Kumar", today, "", "Pending", ""],
    ["T004", "Parent Meeting Notes",         "One-time", "Priya Sharma", today, "", "Pending", ""],
    ["T005", "Library Inventory Check",      "One-time", "Anil Verma",   today, "", "Pending", ""],
    ["T006", "Check Fee Records",            "Daily",    "Anil Verma",   today, "", "Pending", ""]
  ];

  sheet.getRange(2, 1, sampleData.length, headers.length).setValues(sampleData);

  return "Sheet setup complete. Sample data added with Task IDs.";
}
