Here is a **short, clean, compressed README** suitable for GitHub. It keeps the **important info but avoids long explanations**.

---

# myHAQ – AI Legal Complaint Analyzer

myHAQ is an **AI-powered legal assistance platform** that helps users identify relevant laws for their complaints. The system uses **Retrieval-Augmented Generation (RAG)** to extract keywords from user complaints and retrieve matching legal provisions from a stored dataset.

---

## Features

* Complaint submission interface
* AI-based keyword extraction
* Retrieval of relevant laws using RAG
* FastAPI backend with API endpoints
* React-based frontend dashboard
* Expandable legal dataset

---

## Tech Stack

**Frontend**

* React.js
* HTML, CSS, JavaScript

**Backend**

* Python
* FastAPI
* Uvicorn

**AI / NLP**

* Retrieval-Augmented Generation (RAG)
* Embedding-based search

---

## Project Structure

```
myHAQ
│
├── backend
│   ├── app
│   │   └── main.py
│   └── requirements.txt
│
├── frontend
│   └── myHAQ
│       ├── src
│       └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```
git clone https://github.com/your-username/myHAQ.git
cd myHAQ
```

### Backend

```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Runs on:
`http://127.0.0.1:8000`

### Frontend

```
cd frontend/myHAQ
npm install
npm start
```

Runs on:
`http://localhost:3000`

---

## Example API Request

**POST /query**

```
{
  "complaint": "My employer is not paying my salary"
}
```

Response returns **relevant legal sections or laws** based on the complaint.

---

## Future Improvements

* Larger legal datasets
* Multi-language support
* Complaint summarization
* Voice-based complaint input

---


