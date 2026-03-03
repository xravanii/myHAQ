from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.services.retrieval_service import search_sections
from app.routes.auth_routes import get_current_user

router = APIRouter(prefix="/query", tags=["Query"])


# ✅ Request Body Model (JSON input)
class QueryRequest(BaseModel):
    question: str


# ✅ Protected Route (Requires JWT Token)
@router.post("/")
def query_law(
    data: QueryRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        results = search_sections(data.question)

        return {
            "user": current_user["email"],
            "question": data.question,
            "results": results
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))