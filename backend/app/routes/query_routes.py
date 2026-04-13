from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.services.retrieval_service import search_sections
from app.services.llm_service import generate_legal_response
from app.routes.auth_routes import get_current_user
from datetime import datetime
from app.database.mongodb import get_database

router = APIRouter(prefix="/query", tags=["Query"])
db = get_database()

class QueryRequest(BaseModel):
    question: str


@router.post("/")
def query_law(
    data: QueryRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        print("LLM called")

        sections = search_sections(data.question)

        explanation = generate_legal_response(
            question=data.question,
            sections=sections
        )

        # ✅ CLEAN explanation formatting
        explanation = explanation.replace("\n\n", "\n").strip()

        # ✅ SAVE BOTH RAG + LLM
        db.history.insert_one({
            "user_email": current_user["email"],
            "type": "query",
            "question": data.question,
            "sections": sections,          # 🔥 RAG output stored
            "explanation": explanation,    # 🔥 LLM output stored
            "created_at": datetime.utcnow()
        })

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