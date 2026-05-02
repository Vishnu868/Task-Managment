# SVM Task Management System — Setup & Submission Guide

---

## Step 1 — Create the Google Sheet

1. Go to sheets.google.com → New blank spreadsheet
2. Rename it: **SVM Task Management System**
3. Click **Extensions → Apps Script**

---

## Step 2 — Paste the code

In the Apps Script editor:

1. You'll see a default `Code.gs` file — delete everything in it and paste the full contents of **Code.gs** provided
2. Click the **+** icon next to Files → **HTML** → name it exactly `Index` (no extension)
3. Delete everything in that file and paste the full contents of **Index.html** provided
4. Press **Ctrl+S** to save

---

## Step 3 — Run setup (once only)

1. In the Apps Script editor, select `setupSheet` from the function dropdown
2. Click **Run ▶**
3. A permissions popup will appear — click **Review permissions → Allow**
4. Go back to your Sheet — you'll see 8 columns and 6 sample rows added automatically

### Columns created:
| Column | Purpose |
|--------|---------|
| Task ID | Unique identifier (T001, T002…) |
| Task Name | Description of the task |
| Task Type | Daily / Weekly / One-time |
| Assigned To | Team member name (spelling must match exactly) |
| Planned Date | YYYY-MM-DD format |
| Actual Completion Date | Auto-filled when marked Done |
| Status | Pending / Done |
| Weekly Score | +1 on time, -1 late (auto-calculated) |

---

## Step 4 — Deploy as Web App

1. Click **Deploy → New Deployment**
2. Click the gear icon ⚙ → select **Web App**
3. Set:
   - Description: `SVM Task Manager v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy** → copy the Web App URL

> Every time you edit the code after deploying, go to **Deploy → Manage Deployments → Edit → New Version → Deploy** to push updates.

---

## Step 5 — Share the Sheet

1. Open your Google Sheet → **Share**
2. Add reviewer email with **Editor** access
3. Also set "Anyone with the link" to **Viewer** as backup

---

## Step 6 — Add your actual tasks

Edit rows in the Sheet directly. Rules:
- `Task Type` must be exactly: `Daily`, `Weekly`, or `One-time`
- `Status` must be exactly: `Pending` or `Done`
- `Planned Date` format: `YYYY-MM-DD` (e.g. `2026-05-02`)
- `Assigned To` spelling must match exactly what members select in the app
- Task IDs: continue the pattern `T007`, `T008` etc.

### How recurring logic works:
- **Daily** tasks appear every day (no date restriction)
- **Weekly** tasks appear only on the same weekday as their Planned Date (e.g. if Planned Date is a Monday, it shows every Monday)
- **One-time** tasks appear only on their exact Planned Date

---

## Submission write-up (copy-paste this)

The system uses Google Apps Script as the backend, with a Google Sheet as the live database for all task data. Each team member opens a mobile-friendly Web App link, selects their name, and instantly sees only their pending tasks for today — split into Recurring (Daily/Weekly) and One-time sections, with correct day-of-week filtering for weekly tasks. Pressing "Mark as Done" triggers a server-side function that updates the Sheet in real time, records the completion date, and calculates a weekly score (+1 if on time, -1 if late). The AI feature is a rule-based Priority Engine built into the backend: it analyses each member's task list and generates a context-aware recommendation — detecting overdue tasks, flagging urgent one-time deadlines, and adjusting advice based on task load — with no external API dependency, ensuring it works reliably every time.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Could not load team list" | Run `setupSheet` in Apps Script first |
| Member's tasks not showing | Check spelling of "Assigned To" matches dropdown exactly |
| Mark as Done not updating Sheet | Re-deploy after any code changes (new version required) |
| Weekly tasks showing every day | Check that Planned Date is set to the correct target weekday |
| App shows blank after deploy | Clear browser cache or open in incognito |
