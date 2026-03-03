from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from app.services.complaint_service import generate_complaint_pdf
from app.routes.auth_routes import get_current_user

router = APIRouter(prefix="/complaint", tags=["Complaint"])


class ComplaintRequest(BaseModel):
    full_name: str
    address: str
    phone: str
    police_station: str | None = None
    incident_date: str
    incident_location: str
    description: str
    accused_name: str | None = None
    witness_details: str | None = None
    evidence_details: str | None = None
    loss_amount: str | None = None


@router.post("/generate")
def generate_complaint(
    data: ComplaintRequest,
    current_user: dict = Depends(get_current_user)  # 🔐 Protect route
):
    try:
        pdf_buffer = generate_complaint_pdf(data)

        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=complaint_letter.pdf"
            },
        )

    except Exception as e:
        print("Complaint Error:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))