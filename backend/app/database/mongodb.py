from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
print("MONGO_URI =", MONGO_URI)
client = MongoClient(MONGO_URI)
db = client["myhaq_db"]

def get_database():
    return db