📘 Phase: Legal Dataset Engineering

In this phase, we design and curate a structured legal knowledge base to power the Retrieval-Augmented Generation (RAG) system.

Instead of directly querying a language model, we first construct a curated dataset of important legal provisions, primarily focusing on:

40–50 key sections of the Indian Penal Code (IPC)

Fewer than 20 commonly referenced Acts

Each legal provision is stored in a structured JSON format with metadata such as section number, act name, category, summary, and keywords.

This structured approach enables:

Efficient semantic embedding generation

Accurate FAISS-based similarity retrieval

Context-grounded response generation

Improved complaint drafting capability