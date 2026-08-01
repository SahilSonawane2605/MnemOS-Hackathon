"""
mnemosService.py

Handles:
- Memory retrieval
- Gemini API communication
- API key rotation
- Conversation history
"""

import logging
import traceback
from typing import List, Optional, Dict, Any

from google import genai

from keyManager import getKey, rotateKey, totalKeys
from database import db

# -----------------------------------------------------------------------------
# Logger Configuration
# -----------------------------------------------------------------------------

logger = logging.getLogger(__name__)

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------

MODEL = "gemini-flash-latest"
MAX_HISTORY = 50

# -----------------------------------------------------------------------------
# Memory Retrieval
# -----------------------------------------------------------------------------
def get_relevant_memories(query: str) -> List[Dict[str, Any]]:
    try:
        cursor = db.cursor()

        query_lower = query.lower()

        # Questions that require overall context
        general_queries = [
            "what am i learning",
            "learning summary",
            "summary",
            "overview",
            "my skills",
            "skills",
            "recommendation",
            "recommendations",
            "career",
            "progress",
            "what did i learn",
            "what should i learn",
        ]

        if any(q in query_lower for q in general_queries):
            cursor.execute("""
                SELECT *
                FROM memories
                ORDER BY id DESC
                LIMIT 50
            """)

        else:
            cursor.execute("""
                SELECT *
                FROM memories
                WHERE
                    title LIKE ?
                    OR topic LIKE ?
                    OR skill LIKE ?
                    OR url LIKE ?
                ORDER BY id DESC
                LIMIT 20
            """, (
                f"%{query}%",
                f"%{query}%",
                f"%{query}%",
                f"%{query}%"
            ))

        return [dict(row) for row in cursor.fetchall()]

    except Exception:
        logger.exception("Failed to retrieve memories")
        return []
# -----------------------------------------------------------------------------
# Gemini Response Generation
# -----------------------------------------------------------------------------

async def generate_response(prompt: str) -> Optional[str]:
    """
    Generate a response from Gemini.

    Automatically rotates API keys if quota is exhausted.
    """

    max_attempts = totalKeys()

    for attempt in range(max_attempts):

        try:

            client = genai.Client(
                api_key=getKey()
            )

            response = await client.aio.models.generate_content(
                model=MODEL,
                contents=prompt
            )

            text = getattr(response, "text", None)

            if text and text.strip():
                return text.strip()

            finish_reason = "Unknown"

            if hasattr(response, "candidates") and response.candidates:
                finish_reason = getattr(
                    response.candidates[0],
                    "finish_reason",
                    "Unknown"
                )

            raise ValueError(
                f"Gemini returned an empty response. Finish Reason: {finish_reason}"
            )

        except Exception as error:

            error_text = str(error).lower()

            quota_error = any(
                keyword in error_text
                for keyword in [
                    "429",
                    "quota exceeded",
                    "resource_exhausted",
                    "rate limit"
                ]
            )

            if quota_error:

                logger.warning(
                    "Quota exceeded on API key %d/%d. Rotating...",
                    attempt + 1,
                    max_attempts
                )

                rotateKey()

                continue

            print("\n================ GEMINI ERROR ================\n")
            traceback.print_exc()
            print("\n==============================================\n")

            logger.exception("Gemini API request failed")

            return None

    logger.error("All Gemini API keys have exhausted their quota.")

    return None


# -----------------------------------------------------------------------------
# Conversation History
# -----------------------------------------------------------------------------

def append_to_history(
    chat_history: List[str],
    role: str,
    message: str,
    max_history: int = MAX_HISTORY
) -> None:
    """
    Append a message to conversation history.

    Keeps only the latest max_history messages.
    """

    chat_history.append(f"{role}: {message}")

    while len(chat_history) > max_history:
        chat_history.pop(0)