from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from app.services.complaint_service import generate_complaint_pdf
from app.routes.auth_routes import get_current_user
from datetime import datetime
from app.database.mongodb import get_database

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


# ✅ MAIN GENERATE ROUTE
@router.post("/generate")
def generate_complaint(
    data: ComplaintRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        db = get_database()
        pdf_buffer = generate_complaint_pdf(data)

        # ✅ Save to history
        db.history.insert_one({
            "user_email": current_user["email"],
            "type": "complaint",
            "complaint_data": data.dict(),
            "created_at": datetime.utcnow()
        })

        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=complaint_letter.pdf"
            },
        )

    except Exception as e:
        print(f"Complaint generation failed: {type(e).__name__}")
        raise HTTPException(status_code=500, detail="Unable to generate complaint")



@router.post("/regenerate")
def regenerate_complaint(
    data: ComplaintRequest,
    current_user: dict = Depends(get_current_user)
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
        print(f"Complaint regeneration failed: {type(e).__name__}")
        raise HTTPException(status_code=500, detail="Unable to regenerate complaint")