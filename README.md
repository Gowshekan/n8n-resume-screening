# 🤖 AI Resume Screening System

An AI-powered Resume Screening System built using **n8n**, **Google Gemini AI**, **Google Sheets**, **Gmail**, and a custom Resume Upload Website.

The system automatically analyzes uploaded resumes, extracts candidate information, scores the resume using AI, stores candidate details, notifies HR, and sends personalized emails to applicants based on their evaluation.

---

## 🚀 Features

- Resume Upload Website
- PDF Resume Extraction
- AI Resume Analysis using Google Gemini
- Automatic Resume Scoring
- Candidate Information Extraction
- Google Sheets Integration
- HR Email Notification
- Candidate Email Automation
- Shortlisted / Under Review / Rejected Decision Logic
- No Manual Resume Parsing Required

---

## 🏗️ Architecture

```
Resume Upload Website
        │
        ▼
n8n Webhook
        │
        ▼
Extract Resume PDF
        │
        ▼
Google Gemini AI
        │
        ▼
Parse AI JSON
        │
        ▼
Google Sheets
        │
        ▼
HR Email Notification
        │
        ▼
Decision Engine

        Score >= 80
             │
      Shortlisted Email

        Score 60–79
             │
      Under Review Email

        Score < 60
             │
      Rejection Email
```

---

## 🛠️ Tech Stack

- n8n
- Google Gemini AI
- Google Sheets API
- Gmail API
- HTML
- CSS
- JavaScript
- PDF Processing

---

## 📂 Workflow

1. Candidate uploads resume.
2. Resume is sent to n8n Webhook.
3. PDF text is extracted.
4. Google Gemini analyzes the resume.
5. AI generates:
   - Candidate Name
   - Email
   - Phone
   - Skills
   - Education
   - Experience
   - Strengths
   - Weaknesses
   - Resume Score
   - Recommendation
6. Candidate information is stored in Google Sheets.
7. HR receives an email with the complete AI analysis.
8. Candidate automatically receives:
   - ✅ Shortlisted
   - ⏳ Under Review
   - ❌ Rejected

---

## 📊 AI Output Example

```json
{
  "candidate_name": "John Doe",
  "email": "john@example.com",
  "skills": [
    "Python",
    "Flask",
    "Azure"
  ],
  "score": 87,
  "recommendation": "Highly Recommended"
}
```

---

## 📁 Project Structure

```
ai-resume-screening-system/

│── frontend/
│   │── index.html
│   │── style.css
│   │── script.js
│
│── workflow/
│   │── ai-resume-screening.json
│
│── screenshots/
│
│── README.md
```

---

## 📷 Screenshots

Add screenshots of:

- Resume Upload Website
- n8n Workflow
- Google Sheets
- HR Email
- Candidate Email

---

## Future Improvements

- Google Drive Resume Storage
- ATS Dashboard
- Resume Ranking
- Duplicate Resume Detection
- Interview Scheduling
- Multi-language Resume Support
- Admin Login
- Analytics Dashboard

---

## Learning Outcomes

This project demonstrates:

- AI Workflow Automation
- Prompt Engineering
- n8n Automation
- Google Workspace Integration
- Resume Parsing
- Email Automation
- Decision-Based Workflow Design
- API Integration

---



---

## License

This project is released under the MIT License.
