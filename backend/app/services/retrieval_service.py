import faiss
import pickle
import os
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VECTOR_PATH = os.path.join(BASE_DIR, "vector_store", "faiss_index.bin")
METADATA_PATH = os.path.join(BASE_DIR, "vector_store", "sections.pkl")

_model = None
_index = None
_sections = None

def _load_resources():
    global _model, _index, _sections
    if _model is None:
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    if _index is None:
        _index = faiss.read_index(VECTOR_PATH)
    if _sections is None:
        with open(METADATA_PATH, "rb") as f:
            _sections = pickle.load(f)


def search_sections(query: str, top_k: int = 3):
    _load_resources()
    query_embedding = _model.encode([query])
    query_embedding = np.array(query_embedding).astype("float32")

    distances, indices = _index.search(query_embedding, top_k)

    results = []
    for idx in indices[0]:
        results.append(_sections[idx])

    return results