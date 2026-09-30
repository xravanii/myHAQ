from fastapi import APIRouter, Depends
from app.routes.auth_routes import get_current_user
from app.database.mongodb import get_database

router = APIRouter(prefix="/profile", tags=["Profile"])

# @router.get("/")
# def get_profile(current_user: dict = Depends(get_current_user)):
#     db = get_database()

#     history = list(db.history.find(
#         {"user_email": current_user["email"]},
#         {"_id": 0}
#     ))

#     return {
#         "email": current_user["email"],
#         "history": history
#     }
@router.get("/history")
def get_history(current_user: dict = Depends(get_current_user)):
    db = get_database()
    history = list(db.history.find(
        {"user_email": current_user["email"]},
        {"_id": 0}
    ).sort("created_at", -1))

    return {"history": history}