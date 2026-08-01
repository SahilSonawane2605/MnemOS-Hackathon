import asyncio
import json
import logging

from mnemosService import generate_response
from prompt import build_pipeline_prompt
from test_data import mock_browser_logs

# Configure logger
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s: %(message)s"
)
logger = logging.getLogger(__name__)

async def run_pipeline() -> None:
    try:
        # Build prompt using shared module and mock data
        prompt = build_pipeline_prompt(mock_browser_logs)
        
        # Call service utilizing key rotation (returns a string or None)
        response_text = await generate_response(prompt)
        
        if not response_text:
            logger.error("Pipeline returned an empty response.")
            return
            
        # Clean up markdown code blocks if present (handles both ``` and ```json)
        raw_text = response_text.strip()
        if raw_text.startswith("```"):
            lines = raw_text.splitlines()

            if lines:
                lines = lines[1:]  # Remove opening fence

            if lines and lines[-1].strip() == "```":
                lines = lines[:-1]  # Remove closing fence

            raw_text = "\n".join(lines).strip()

        data = json.loads(raw_text)
        logger.info("Pipeline executed successfully.")
        logger.info(json.dumps(data, indent=2))
        
    except json.JSONDecodeError as jde:
        logger.error(f"Failed to parse JSON response from Gemini: {jde}")
    except Exception:
        logger.exception("Pipeline execution failed")

if __name__ == "__main__":
    asyncio.run(run_pipeline())