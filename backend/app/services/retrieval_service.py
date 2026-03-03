import faiss
import pickle
import os
from sentence_transformers import SentenceTransformer
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VECTOR_PATH = os.path.join(BASE_DIR, "vector_store", "faiss_index.bin")
METADATA_PATH = os.path.join(BASE_DIR, "vector_store", "sections.pkl")

# Load model once
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load FAISS index
index = faiss.read_index(VECTOR_PATH)

# Load metadata
with open(METADATA_PATH, "rb") as f:
    sections = pickle.load(f)


def search_sections(query: str, top_k: int = 3):
    query_embedding = model.encode([query])
    query_embedding = np.array(query_embedding).astype("float32")

    distances, indices = index.search(query_embedding, top_k)

    results = []
    for idx in indices[0]:
        results.append(sections[idx])

    return results