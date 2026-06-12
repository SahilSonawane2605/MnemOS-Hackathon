require("dotenv").config();
function classifyMemory(title = "", url = "") {
  const text = `${title} ${url}`.toLowerCase();

  if (text.includes("docker")) {
    return {
      topic: "Docker",
      skill: "Cloud Computing",
      source: "Documentation"
    };
  }

  if (text.includes("kubernetes") || text.includes("k8s")) {
    return {
      topic: "Kubernetes",
      skill: "DevOps",
      source: "Documentation"
    };
  }

  if (text.includes("react")) {
    return {
      topic: "React",
      skill: "Web Development",
      source: "Documentation"
    };
  }

  if (text.includes("python")) {
    return {
      topic: "Python",
      skill: "Programming",
      source: "Documentation"
    };
  }

  if (text.includes("youtube")) {
    return {
      topic: title,
      skill: "Learning",
      source: "YouTube"
    };
  }

  return {
    topic: title,
    skill: "General Learning",
    source: "Web"
  };
}
const express = require("express");
const cors = require("cors");

const { GoogleGenAI } = require("@google/genai");
const { getKey } = require("./keyManager");
const db = require("./database");
const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: getKey()
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "MnemOS Backend Running"
  });
});
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const lastMessage = messages[messages.length - 1];
    const question = lastMessage.content;

    db.all(
      `
      SELECT *
      FROM memories
      ORDER BY id DESC
      LIMIT 20
      `,
      [],
      async (err, memories) => {
        if (err) {
          console.error(err);

          return res.status(500).json({
            id: `err-${Date.now()}`,
            sender: "assistant",
            content: "Database Error",
            timestamp: "Just now"
          });
        }

        const memoryContext =
          memories.length > 0
            ? JSON.stringify(memories, null, 2)
            : "No memories found.";

        function buildPrompt(userQuestion, memoryContext, historyContext = "No prior conversation history.") 
{
return `You are MnemOS — an AI Learning Twin and Personal Memory Operating System.

MnemOS was created by Team Abhimanyu from KJEI's Trinity College of Engineering and Research, Pune.

========================
CORE MISSION
============

Your primary job is to transform browsing history, research activity, and learning behavior into actionable learning intelligence.

You are not a generic chatbot.

You are an AI Learning Twin.

Your responsibility is to help users understand:

* What they are learning
* What skills they are developing
* What topics they are researching
* How their interests are evolving
* Which career paths align with their behavior
* What they should learn next

You do not simply recall memories.

You extract patterns, meaning, and insights from them.

========================
MEMORY DATABASE
===============

${memoryContext}

========================
IDENTITY
========

If the user asks:

* Who are you?
* What is MnemOS?
* What can you do?

Answer confidently:

MnemOS is an AI Learning Twin that transforms browser history into meaningful learning intelligence, helping users understand what they have learned, researched, and explored online.

========================
LEARNING TWIN MODE
==================

Analyze memories as evidence of learning activity.

When answering:

1. Identify learning topics.
2. Identify skill growth.
3. Identify research interests.
4. Identify recurring patterns.
5. Infer strengths and growth areas.
6. Suggest next learning steps when useful.
7. Infer career alignment when relevant.

Do not simply list websites.

Explain what those activities mean.

Example:

Bad:
"User visited Docker documentation."

Good:
"The user is strengthening Cloud Computing and DevOps skills through Docker-related learning activities."

========================
PERSONALITY
===========

Smart
Analytical
Professional
Insightful
Concise

You behave like a premium AI operating system.

You do NOT behave like:

* A teacher
* A motivational coach
* A generic chatbot
* A search engine

========================
RESPONSE RULES
==============

1. Keep responses concise.
2. Prefer bullets over paragraphs.
3. Highlight key insights.
4. Give direct answers first.
5. Focus on patterns and meaning.
6. Infer intent from informal language.
7. Support English, Hindi, and Marathi.
8. Do NOT start with greetings.
9. Do NOT say:

   * Hello
   * Hi
   * Let's look at
   * Great question
10. Avoid unnecessary introductions.
11. Sound analytical and insight-driven.
12. Never mention that you are an AI model.
13. Never mention limitations unless necessary.

========================
PERSONALIZED REASONING
======================

Use stored memories to personalize:

* Recommendations
* Learning plans
* Career guidance
* Skill analysis
* Next-step suggestions

Never present generated advice as stored memory.

Clearly separate:

* Observed learning activity
* Generated recommendations

========================
MEMORY RETRIEVAL RULES
======================

Before answering:

1. Search available memories.
2. Identify relevant learning signals.
3. Identify skills and topics.
4. Build a response using memory evidence first.
5. Use general knowledge only when needed.

Never invent memories.

If evidence is insufficient:

Say:
"I couldn't find enough evidence in your captured learning history."

========================
OUTPUT STYLE
============

Preferred structure:

Learning Summary
• Topic 1
• Topic 2

Skill Signals
• Skill A ↑
• Skill B ↑

Patterns
• Observation 1
• Observation 2

Recommendation
• Suggested next step

Keep formatting clean and readable.

========================
CONVERSATION HISTORY
====================

${historyContext}

========================
CURRENT USER MESSAGE
====================

${userQuestion}

========================
FINAL DIRECTIVE
===============

Act as the user's AI Learning Twin.

Transform browsing activity into learning intelligence.

Help the user understand:

* What they learned
* How they are growing
* What they should learn next

Focus on insights, not website history.

MnemOS Response:`;
}

        const prompt = buildPrompt(
          question,
          memoryContext
        );
        let answer = "";

try {

  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt
  });

  answer = result.text;

} catch (error) {

  console.error("Gemini Error:", error);

  answer =
    "I analyzed your recent learning activity, but the AI service is temporarily unavailable. Please try again in a moment.";

}

        res.json({
          id: `m-${Date.now()}`,
          sender: "assistant",
          content: answer,
          timestamp: "Just now"
        });
      }
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      id: `err-${Date.now()}`,
      sender: "assistant",
      content: "Server Error",
      timestamp: "Just now"
    });
  }
});
app.post("/api/memories", (req, res) => {
  console.log("MEMORY RECEIVED:");
  console.log(req.body);
  const {
  url,
  title,
  timestamp,
  duration_seconds
} = req.body;

const {
  topic,
  skill,
  source
} = classifyMemory(title, url);
  db.run(
    `
    INSERT INTO memories
    (url, title, topic, skill, source, timestamp, duration_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      url,
      title,
      topic,
      skill,
      source,
      timestamp,
      duration_seconds
    ],
    (err) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        success: true
      });
    }
  );
});
app.get("/api/memories", (req, res) => {
  db.all(
    "SELECT * FROM memories ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json(rows);
    }
  );
});
app.get("/api/learning-twin", (req, res) => {

  db.all(
    "SELECT * FROM memories",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      const totalMemories = rows.length;

      const skillCount = {};
      const topicCount = {};

      rows.forEach(memory => {

        if (memory.skill) {
          skillCount[memory.skill] =
            (skillCount[memory.skill] || 0) + 1;
        }

        if (memory.topic) {
          topicCount[memory.topic] =
            (topicCount[memory.topic] || 0) + 1;
        }

      });

      const topSkill =
        Object.keys(skillCount).length > 0
          ? Object.entries(skillCount)
              .sort((a, b) => b[1] - a[1])[0][0]
          : "No Skill Data";

      const topTopic =
        Object.keys(topicCount).length > 0
          ? Object.entries(topicCount)
              .sort((a, b) => b[1] - a[1])[0][0]
          : "No Topic Data";

      const curiosityScore =
        Math.min(
          100,
          totalMemories * 5
        );

      const learningMomentum =
        Math.min(
          100,
          totalMemories * 4
        );

      let learningPersonality =
        "Explorer";

      if (topSkill === "Cloud Computing") {
        learningPersonality =
          "Systems Thinker";
      }

      if (topSkill === "Web Development") {
        learningPersonality =
          "Builder";
      }

      if (topSkill === "Programming") {
        learningPersonality =
          "Problem Solver";
      }

      res.json({
        totalMemories,
        topSkill,
        topTopic,
        curiosityScore,
        learningMomentum,
        learningPersonality
      });

    }
  );

});
app.get("/api/timeline", (req, res) => {

  db.all(
    "SELECT * FROM memories ORDER BY id DESC LIMIT 50",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json(rows);
    }
  );

});
app.get("/api/skills", (req, res) => {

  db.all(
    "SELECT * FROM memories",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      const skills = {};

      rows.forEach(memory => {
        const skill = memory.skill || "General Learning";

        skills[skill] = (skills[skill] || 0) + 1;
      });

      res.json(skills);
    }
  );

});
app.get("/api/career", (req, res) => {

  db.all(
    "SELECT * FROM memories",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      let cloudCount = 0;
      let webCount = 0;
      let programmingCount = 0;

      rows.forEach(memory => {

        if (memory.skill === "Cloud Computing")
          cloudCount++;

        if (memory.skill === "Web Development")
          webCount++;

        if (memory.skill === "Programming")
          programmingCount++;
      });

      res.json({
        cloudEngineer: cloudCount * 10,
        webDeveloper: webCount * 10,
        softwareEngineer: programmingCount * 10
      });
    }
  );

});
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});