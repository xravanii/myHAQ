from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from app.database.mongodb import get_database
from app.schemas.user_schema import UserRegister, UserLogin
from app.utils.security import hash_password, verify_password, create_access_token, verify_token
from app.models.user_model import user_helper

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(user: UserRegister):
    db = get_database()
    existing_user = db.users.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)

    new_user = {
        "email": user.email,
        "password": hashed_password
    }

    result = db.users.insert_one(new_user)
    created_user = db.users.find_one({"_id": result.inserted_id})

    return user_helper(created_user)


from fastapi.security import OAuth2PasswordRequestForm

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = get_database()
    
    db_user = db.users.find_one({"email": form_data.username})

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(form_data.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": db_user["email"]})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.get("/me")
def get_current_user(token: str = Depends(oauth2_scheme)):
    email = verify_token(token)

    db = get_database()
    user = db.users.find_one({"email": email})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": str(user["_id"]),
        "email": user["email"]
    }