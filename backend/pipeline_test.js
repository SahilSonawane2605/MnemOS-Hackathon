const { GoogleGenAI } = require("@google/genai");

require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const mockBrowserLogs = [
  {
    title: "Introduction to Docker Containers",
    url: "https://docs.docker.com/get-started/"
  },
  {
    title: "How to resolve Docker exit code 137 error",
    url: "https://stackoverflow.com/questions/137"
  },
  {
    title: "Understanding Docker Compose volumes",
    url: "https://docs.docker.com/compose/"
  }
];

async function runPipeline() {

  const prompt = `
  Analyze these browser logs and return ONLY JSON.

  Browser Logs:
  ${JSON.stringify(mockBrowserLogs)}

  Return this format:
  {
    "core_interest": "",
    "user_goal": "",
    "ai_summary": "",
    "next_steps": []
  }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  console.log(response.text);
}

runPipeline();