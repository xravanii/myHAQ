import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def get_llm_client():
    return OpenAI(
        api_key=os.getenv("GROQ_API_KEY"),
        base_url="https://api.groq.com/openai/v1"
    )

def generate_legal_response(question: str, sections: list):
    context_text = ""

    for sec in sections:
        context_text += f"""
Section {sec['section']} - {sec['title']}
Summary: {sec['summary']}
Content: {sec['content']}
Punishment: {sec['punishment']}
"""

    prompt = f"""
You are a legal assistant specializing in Indian Penal Code (IPC).

User Question:
{question}

Relevant IPC Sections:
{context_text}

Explain clearly in simple language.
Do not give final legal advice.
"""

    client = get_llm_client()
    model_name = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
    response = client.chat.completions.create(
        model=model_name,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    return response.choices[0].message.content