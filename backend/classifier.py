"""
classifier.py

Simple rule-based classifier for MnemOS.
"""

from typing import Dict


def classify_memory(title: str, url: str) -> Dict[str, str]:
    """
    Classify a browser memory into topic, skill, and source.
    """

    text = f"{title} {url}".lower()

    # ---------- AI / ML ----------
    if any(word in text for word in [
        "python",
        "machine learning",
        "deep learning",
        "tensorflow",
        "pytorch",
        "numpy",
        "pandas",
        "opencv",
        "scikit",
        "llm",
        "genai",
        "ai"
    ]):
        return {
            "topic": "Artificial Intelligence",
            "skill": "Programming",
            "source": "AI/ML"
        }

    # ---------- Web Development ----------
    if any(word in text for word in [
        "html",
        "css",
        "javascript",
        "react",
        "vite",
        "node",
        "express",
        "frontend",
        "backend"
    ]):
        return {
            "topic": "Web Development",
            "skill": "Web Development",
            "source": "Web"
        }

    # ---------- Cloud ----------
    if any(word in text for word in [
        "aws",
        "azure",
        "gcp",
        "docker",
        "kubernetes",
        "cloud"
    ]):
        return {
            "topic": "Cloud Computing",
            "skill": "Cloud Computing",
            "source": "Cloud"
        }

    # ---------- Database ----------
    if any(word in text for word in [
        "mysql",
        "postgres",
        "sqlite",
        "mongodb",
        "database",
        "sql"
    ]):
        return {
            "topic": "Database",
            "skill": "Database",
            "source": "Database"
        }

    # ---------- Default ----------
    return {
        "topic": "General Learning",
        "skill": "General Learning",
        "source": "Browser"
    }