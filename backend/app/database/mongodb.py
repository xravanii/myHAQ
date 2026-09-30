from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

_client = None
_db = None

def get_database():
    global _client, _db
    if _db is None:
        mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
        _client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        _db = _client["myhaq_db"]
    return _db