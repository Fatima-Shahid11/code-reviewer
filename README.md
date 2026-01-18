# Comaa – AI Code Reviewer

Comaa is an AI-powered code review tool built with **Next.js (App Router)**.  
It analyzes code in **any programming language**, detects issues, highlights strengths, provides actionable recommendations, and generates an improved (“renewed”) version of the code.

---

## ✨ Features

- 🧩 Paste code in any programming language
- 🤖 Automatic language detection
- 🚨 Security, performance, and code quality analysis
- ⭐ Highlights strengths and best practices
- 💡 Actionable recommendations
- 🔄 Renewed (improved) code output
- 📊 Overall quality score (0–10)
- 🌓 Dark / Light mode (persisted)
- 📋 One-click copy for reviewed code
- ⚡ Fast analysis via n8n webhook

---

## 🏗 Tech Stack

- **Next.js**
- **React**
- **Tailwind CSS**
- **n8n** (AI orchestration)

---

## 🔌 How It Works

1. Paste code into the editor
2. Click **Review Code**
3. Frontend sends the code to `/api/review`
4. API route forwards the request to an **n8n webhook**
5. AI analyzes the code and returns:
   - Detected language
   - Overall score
   - Issues
   - Strengths
   - Recommendations
   - Renewed (improved) code
6. Results are displayed in the UI with tabbed views

---

## 🌐 API Endpoint

### `POST /api/review`

---

## ENV Variables

### Add an .env.local file at the project's root dir
### N8N_REVIEW_URL=https://your-n8n-webhook-url

