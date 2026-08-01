from datetime import datetime
import json
import logging
from typing import Dict, List, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import modularized components
from prompt import build_prompt
from mnemosService import generate_response, get_relevant_memories
from classifier import classify_memory
from database import db

# Logging Configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(title="MnemOS Backend")

# CORS Configuration including standard Vite port (5173) and production origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic Models for Request Validation
class MemoryCreate(BaseModel):
    url: str = ""
    title: str = ""
    timestamp: str | None = None
    duration_seconds: int | None = 0


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


@app.get("/")
def root() -> Dict[str, str]:
    return {
        "message": "Welcome to MnemOS Backend",
        "status": "Running"
    }


@app.get("/api/health")
def health() -> Dict[str, str]:
    return {"status": "MnemOS Backend Running"}


@app.post("/api/chat")
async def chat_with_twin(payload: ChatRequest) -> Dict[str, Any]:
    if not payload.messages:
        raise HTTPException(
            status_code=400,
            detail="No messages provided."
        )
    
    question = payload.messages[-1].content
    
    try:
        history_msgs = payload.messages[:-1]
        history_context = (
            "\n".join([f"{m.role}: {m.content}" for m in history_msgs]) 
            if history_msgs 
            else "No prior conversation history."
        )

        rows = get_relevant_memories(question)
        
        memory_context = (
            json.dumps(rows, indent=2)
            if rows
            else "No memories found."
        )

        prompt = build_prompt(
            userQuestion=question,
            memoryContext=memory_context,
            historyContext=history_context
        )

        answer = await generate_response(prompt)
        
        if answer is None:
            raise HTTPException(
                status_code=503,
                detail="The AI service is temporarily unavailable. Please try again later."
            )

    except HTTPException as he:
        raise he
    except Exception as error:
        logger.error("Error processing chat request: %s", error, exc_info=True)
        raise HTTPException(
            status_code=500, 
            detail="An unexpected error occurred while processing your request."
        )

    return {
        "id": f"m-{int(datetime.now().timestamp() * 1000)}",
        "sender": "assistant",
        "content": answer,
        # Updated to structured ISO 8601 timestamp
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/memories")
def create_memory(memory: MemoryCreate) -> Dict[str, bool]:
    logger.info("MEMORY RECEIVED: %s", memory.model_dump())
    
    classified = classify_memory(memory.title, memory.url)
    topic = classified["topic"]
    skill = classified["skill"]
    source = classified["source"]

    try:
        cursor = db.cursor()
        cursor.execute(
            """
            INSERT INTO memories
            (
                url,
                title,
                topic,
                skill,
                source,
                timestamp,
                duration_seconds
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                memory.url,
                memory.title,
                topic,
                skill,
                source,
                memory.timestamp,
                memory.duration_seconds
            )
        )
        db.commit()
        return {"success": True}
    except Exception as err:
        db.rollback()
        logger.exception("Failed to insert memory into database.")
        raise HTTPException(status_code=500, detail=str(err))


@app.get("/api/memories")
def get_memories() -> List[Dict[str, Any]]:
    try:
        cursor = db.cursor()
        cursor.execute("""
        SELECT *
        FROM memories
        ORDER BY id DESC
        """)
        rows = [dict(row) for row in cursor.fetchall()]
        return rows
    except Exception as err:
        logger.error("Failed to fetch memories: %s", err)
        raise HTTPException(status_code=500, detail=str(err))


@app.get("/api/learning-twin")
def get_learning_twin() -> Dict[str, Any]:
    try:
        cursor = db.cursor()
        cursor.execute("""
        SELECT *
        FROM memories
        """)
        rows = [dict(row) for row in cursor.fetchall()]
        total_memories = len(rows)

        skill_count = {}
        topic_count = {}

        for memory in rows:
            skill = memory.get("skill")
            topic = memory.get("topic")

            if skill:
                skill_count[skill] = skill_count.get(skill, 0) + 1
            if topic:
                topic_count[topic] = topic_count.get(topic, 0) + 1

        top_skill = (
            max(skill_count, key=skill_count.get)
            if skill_count
            else "No Skill Data"
        )
        top_topic = (
            max(topic_count, key=topic_count.get)
            if topic_count
            else "No Topic Data"
        )

        curiosity_score = min(100, total_memories * 5)
        learning_momentum = min(100, total_memories * 4)

        learning_personality = "Explorer"
        if top_skill == "Cloud Computing":
            learning_personality = "Systems Thinker"
        elif top_skill == "Web Development":
            learning_personality = "Builder"
        elif top_skill == "Programming":
            learning_personality = "Problem Solver"

        return {
            "totalMemories": total_memories,
            "topSkill": top_skill,
            "topTopic": top_topic,
            "curiosityScore": curiosity_score,
            "learningMomentum": learning_momentum,
            "learningPersonality": learning_personality,
        }
    except Exception as err:
        logger.error("Failed to compute learning twin metrics: %s", err)
        raise HTTPException(status_code=500, detail=str(err))


@app.get("/api/timeline")
def get_timeline() -> List[Dict[str, Any]]:
    try:
        cursor = db.cursor()
        cursor.execute("""
        SELECT *
        FROM memories
        ORDER BY id DESC
        LIMIT 50
        """)
        rows = [dict(row) for row in cursor.fetchall()]
        return rows
    except Exception as err:
        logger.error("Failed to fetch timeline: %s", err)
        raise HTTPException(status_code=500, detail=str(err))


@app.get("/api/skills")
def get_skills() -> Dict[str, int]:
    try:
        cursor = db.cursor()
        cursor.execute("""
        SELECT *
        FROM memories
        """)
        rows = [dict(row) for row in cursor.fetchall()]
        skills = {}
        for memory in rows:
            skill = memory.get("skill") or "General Learning"
            skills[skill] = skills.get(skill, 0) + 1
        return skills
    except Exception as err:
        logger.error("Failed to aggregate skills: %s", err)
        raise HTTPException(status_code=500, detail=str(err))


@app.get("/api/career")
def get_career() -> Dict[str, int]:
    try:
        cursor = db.cursor()
        cursor.execute("""
        SELECT *
        FROM memories
        """)
        rows = [dict(row) for row in cursor.fetchall()]
        cloud_count = 0
        web_count = 0
        programming_count = 0

        for memory in rows:
            skill = memory.get("skill")
            if skill == "Cloud Computing":
                cloud_count += 1
            elif skill == "Web Development":
                web_count += 1
            elif skill == "Programming":
                programming_count += 1

        return {
            "cloudEngineer": cloud_count * 10,
            "webDeveloper": web_count * 10,
            "softwareEngineer": programming_count * 10,
        }
    except Exception as err:
        logger.error("Failed to generate career metrics: %s", err)
        raise HTTPException(status_code=500, detail=str(err))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )