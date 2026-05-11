# 📋 Mini Task Management System for SVM

A lightweight, mobile-first task management system backed by Google Sheets, with AI-powered smart insights and real-time task tracking for team productivity.

---

## 🌟 Features

- 📊 Google Sheets as live backend — no database setup required
- 📱 Mobile-friendly web app optimized for phone browsers
- 👤 Personalized task view — each member sees only their tasks for today
- ✅ One-tap **Mark as Done** with instant Google Sheet sync
- 🔁 Separate sections for Recurring and One-time tasks
- 🤖 AI-powered weekly performance summaries and smart suggestions
- 🏆 Automated weekly scoring — penalties for missed or late completions

---

## 🛠️ Tech Stack

| Layer | Tech Used |
|---|---|
| Backend / Database | Google Sheets + Apps Script |
| Frontend | HTML, CSS, JavaScript (Mobile-first) |
| API Bridge | Google Apps Script Web App (REST) |
| AI Integration | Claude API / Gemini API |
| Hosting | Google Apps Script Deploy / Netlify |

---

## ⚙️ Workflow

1. Admin enters tasks in **Google Sheet** — name, type, assignee, planned date, status.
2. Team member opens the **web app link** on their phone and selects their name.
3. App fetches and displays today's tasks split into **Recurring** and **One-time** sections.
4. Member taps **Mark as Done** → actual completion date and status update instantly in the sheet.
5. **AI module** analyzes weekly data and generates performance summaries and improvement tips.
6. Weekly score is auto-calculated — missed or late tasks reduce the score.

---

## 📊 Google Sheet Structure

| Column | Description |
|---|---|
| Task Name | What needs to be done |
| Task Type | Daily / Weekly / One-time |
| Assigned To | Team member name |
| Planned Date | Expected completion date |
| Actual Completion Date | Auto-filled on Mark as Done |
| Status | Pending / Done |
| Weekly Score | Auto-calculated with late/miss penalties |

---

## 📱 Mobile Web App

- Member selects their name on load — no login required
- **Recurring Tasks** section: Daily and Weekly duties
- **One-time Tasks** section: Specific dated assignments
- Mark as Done button syncs directly to Google Sheets via Apps Script API
- Fully responsive — designed for small screens first

---

## 🤖 AI Integration

- Analyzes each member's weekly task completion pattern
- Flags consistently missed tasks and suggests priority adjustments
- Generates a plain-English **Weekly Performance Summary** per member
- Prompt sent to AI with task history → response displayed in app or emailed to admin

---

## 💻 Sample AI Summary Response

```json
{
  "member": "Ravi Kumar",
  "completed_on_time": 8,
  "late_completions": 2,
  "missed": 1,
  "weekly_score": 74,
  "ai_suggestion": "Ravi consistently delays Tuesday reporting tasks. Consider setting a morning reminder or redistributing workload."
}
```

---

## 🔐 Request Full Source Access

This repository provides a complete overview of the system architecture and components.
The full implementation — including Apps Script code, frontend build, AI prompt templates, and Sheet configuration — is available **upon request**.

**To request access:**
Feel free to contact me via:

- 📧 **Email:** [medaramvishnu7@gmail.com]

> Access is granted for academic review, demonstration, or collaboration purposes only.
