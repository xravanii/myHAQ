from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.services.retrieval_service import search_sections
from app.services.llm_service import generate_legal_response
from app.routes.auth_routes import get_current_user

router = APIRouter(prefix="/query", tags=["Query"])


class QueryRequest(BaseModel):
    question: str


@router.post("/")
def query_law(
    data: QueryRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        print("LLM called")

        # 1️⃣ Retrieve sections
        sections = search_sections(data.question)

        # 2️⃣ Generate explanation using Groq
        explanation = generate_legal_response(
            question=data.question,
            sections=sections
        )

        # 3️⃣ Return response
        return {
            "user": current_user["email"],
            "question": data.question,
            "explanation": explanation,
            "sections": sections
        }

    except Exception as e:
        print("🔥 FULL ERROR:")
        print(repr(e))
        raise HTTPException(status_code=500, detail=str(e))