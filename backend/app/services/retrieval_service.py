import pickle
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
METADATA_PATH = os.path.join(BASE_DIR, "vector_store", "sections.pkl")

_sections = None

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

def warmup_models_background():
    _load_sections()

def search_sections(query: str, top_k: int = 3):
    sections_list = _load_sections()
    if not sections_list:
        return []

    query_words = [w.lower() for w in query.split() if len(w) > 2]
    if not query_words:
        return sections_list[:top_k]

    scored = []
    for sec in sections_list:
        text = f"{sec.get('section', '')} {sec.get('title', '')} {sec.get('summary', '')} {sec.get('content', '')} {sec.get('act', '')}".lower()
        score = sum(2 if w in sec.get('title', '').lower() else 1 for w in query_words if w in text)
        if score > 0:
            scored.append((score, sec))

    scored.sort(key=lambda x: x[0], reverse=True)
    if scored:
        return [item[1] for item in scored[:top_k]]
    return sections_list[:top_k]