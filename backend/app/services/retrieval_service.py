import faiss
import pickle
import os
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VECTOR_PATH = os.path.join(BASE_DIR, "vector_store", "faiss_index.bin")
METADATA_PATH = os.path.join(BASE_DIR, "vector_store", "sections.pkl")

import threading

_model = None
_index = None
_sections = None
_loading_lock = threading.Lock()

def _load_sections():
    global _sections
    if _sections is None:
        try:
            with open(METADATA_PATH, "rb") as f:
                _sections = pickle.load(f)
        except Exception as e:
            print("Error loading sections:", e)
            _sections = []
    return _sections

def _load_model_and_index():
    global _model, _index
    with _loading_lock:
        if _model is None:
            from sentence_transformers import SentenceTransformer
            _model = SentenceTransformer("all-MiniLM-L6-v2")
        if _index is None:
            _index = faiss.read_index(VECTOR_PATH)

def warmup_models_background():
    def _target():
        try:
            _load_sections()
            _load_model_and_index()
            print("[OK] Background model warmup complete.")
        except Exception as e:
            print("[WARN] Background model warmup warning:", e)
    threading.Thread(target=_target, daemon=True).start()

def search_sections(query: str, top_k: int = 3):
    sections_list = _load_sections()
    try:
        _load_model_and_index()
        query_embedding = _model.encode([query])
        query_embedding = np.array(query_embedding).astype("float32")
        distances, indices = _index.search(query_embedding, top_k)
        results = []
        for idx in indices[0]:
            if idx < len(sections_list):
                results.append(sections_list[idx])
        if results:
            return results
    except Exception as e:
        print("Vector search fallback triggered:", e)

    # Keyword search fallback
    query_words = [w.lower() for w in query.split() if len(w) > 2]
    scored = []
    for sec in sections_list:
        text = f"{sec.get('section', '')} {sec.get('title', '')} {sec.get('summary', '')} {sec.get('content', '')}".lower()
        score = sum(1 for w in query_words if w in text)
        if score > 0:
            scored.append((score, sec))
    scored.sort(key=lambda x: x[0], reverse=True)
    if scored:
        return [item[1] for item in scored[:top_k]]
    return sections_list[:top_k] if sections_list else []