# ⚖️ MYHAQ – AI-Powered Legal Assistance System

> Bridging the gap between complex legal information and common citizens using Retrieval-Augmented Generation (RAG) and Large Language Models.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![FAISS](https://img.shields.io/badge/FAISS-VectorDB-orange)
![Groq](https://img.shields.io/badge/Groq-LLM-red)

---

## 📌 Overview

Legal information is often difficult for ordinary citizens to understand because of technical language, scattered resources, and limited access to affordable legal guidance.

**MYHAQ** is an AI-powered legal assistance platform that simplifies Indian legal information by combining **Retrieval-Augmented Generation (RAG)** with **Large Language Models (LLMs)**. Instead of generating responses solely from an LLM, the system first retrieves relevant legal sections from a vector database and then explains them in simple, easy-to-understand language.

Apart from answering legal questions, the platform also helps users generate complaint letters, access verified government legal resources, and maintain a history of previous legal queries.

---

# ✨ Features

## 🧠 AI Legal Assistant (RAG)

- Ask legal questions in natural language.
- Retrieves relevant IPC/legal sections using semantic search.
- Generates simplified explanations using an LLM.
- Reduces hallucinations by grounding responses in retrieved legal content.

---

## 📄 Complaint Generator

Generate professionally formatted complaint letters in PDF format by providing:

- Personal Information
- Incident Details
- Police Station
- Evidence
- Witness Details
- Financial Loss (optional)

The generated complaint is ready for download and printing.

---

## 👤 User Authentication

- Secure Registration
- JWT Authentication
- Login & Logout
- Protected APIs
- Password Hashing

---

## 📚 User Profile & History

Each authenticated user has a profile containing:

- Email
- Previous legal questions
- Retrieved legal sections
- AI-generated explanations
- Complaint generation history

History is stored securely in MongoDB.

---

## 🏛 Government Legal Resources

Quick access to verified government portals including:

- National Cyber Crime Portal
- NALSA
- India Code
- eCourts
- Consumer Helpline
- Digital Police Portal
- National Commission for Women
- Emergency Response (112)

---

# 🏗 System Architecture

```
                User
                  │
                  ▼
         React Frontend (Vite)
                  │
                  ▼
          FastAPI Backend APIs
                  │
      ┌───────────┼────────────┐
      ▼           ▼            ▼
 Authentication   RAG      Complaint PDF
      │           │            │
      ▼           ▼            ▼
 MongoDB      FAISS Index    ReportLab
                  │
                  ▼
     SentenceTransformer Embeddings
                  │
                  ▼
              Groq LLM API
                  │
                  ▼
         Simplified Legal Response
```

---

# 🧠 RAG Pipeline

```
User Question
      │
      ▼
SentenceTransformer Embedding
      │
      ▼
FAISS Similarity Search
      │
      ▼
Relevant IPC Sections Retrieved
      │
      ▼
Groq LLM
      │
      ▼
Simple Legal Explanation
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

---

## Backend

- FastAPI
- Python
- Uvicorn

---

## AI / NLP

- Sentence Transformers
- all-MiniLM-L6-v2
- Groq API (LLaMA Model)
- Retrieval-Augmented Generation (RAG)

---

## Vector Search

- FAISS

---

## Database

- MongoDB Atlas

---

## Authentication

- JWT Tokens
- Passlib (Password Hashing)

---

## PDF Generation

- ReportLab

---

# 📂 Project Structure

```
MYHAQ
│
├── backend
│   ├── app
│   │   ├── routes
│   │   ├── services
│   │   ├── database
│   │   ├── models
│   │   ├── schemas
│   │   ├── utils
│   │   └── vector_store
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   └── myHAQ
│       ├── src
│       ├── public
│       └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/myHAQ.git
cd myHAQ
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend/myHAQ

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string

SECRET_KEY=your_secret_key

GROQ_API_KEY=your_groq_api_key
```

---

# 📷 Screenshots

Add screenshots here:

- Home Page
- AI Legal Assistant
- Complaint Generator
- User Profile
- Resources Page

---

# 🚀 Future Enhancements

- Multilingual legal support
- Voice-based legal assistance
- OCR for legal document analysis
- AI-powered complaint drafting improvements
- Personalized legal recommendations
- Court case tracking
- Legal chatbot memory
- Risk level prediction for legal queries

---

# 👩‍💻 Contributors

- **Sravani**
- Team Members

---

# 📜 License

This project was developed as part of an academic Software Engineering mini-project.

Feel free to use it for learning and educational purposes.
