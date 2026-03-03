import os
import json
import pickle
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "legal_sections.json")
VECTOR_STORE_PATH = os.path.join(BASE_DIR, "vector_store")

INDEX_PATH = os.path.join(VECTOR_STORE_PATH, "faiss_index.bin")
SECTIONS_PATH = os.path.join(VECTOR_STORE_PATH, "sections.pkl")

# Load model
print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load legal sections
print("Loading legal sections...")
with open(DATA_PATH, "r", encoding="utf-8") as f:
    sections = json.load(f)

# Prepare texts
print("Preparing text data...")
texts = []
for section in sections:
    combined_text = f"""
    Act: {section.get("act")}
    Section: {section.get("section")}
    Title: {section.get("title")}
    Description: {section.get("description")}
    Punishment: {section.get("punishment")}
    """
    texts.append(combined_text.strip())

# Generate embeddings
print("Generating embeddings...")
embeddings = model.encode(texts, convert_to_numpy=True)

# Create FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# Ensure vector_store folder exists
os.makedirs(VECTOR_STORE_PATH, exist_ok=True)

# Save index
faiss.write_index(index, INDEX_PATH)

# Save sections metadata
with open(SECTIONS_PATH, "wb") as f:
    pickle.dump(sections, f)

print("✅ FAISS index built successfully!")
print(f"Saved to: {VECTOR_STORE_PATH}")