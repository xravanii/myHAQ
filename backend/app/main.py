from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import router as auth_router
from app.routes.query_routes import router as query_router

app = FastAPI()

# ✅ CORS MUST BE HERE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers AFTER middleware
app.include_router(auth_router)
app.include_router(query_router)


@app.get("/")
def root():
    return {"message": "Auth system ready 🚀"}