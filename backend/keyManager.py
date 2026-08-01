from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Read all Google API keys from .env
keys = sorted(
    value
    for key, value in os.environ.items()
    if key.startswith("GOOGLE_API_KEY_")
)

if not keys:
    raise ValueError("No Google API keys found in .env file")

current_index = 0


def getKey():
    """Return the current API key."""
    return keys[current_index]


def rotateKey():
    """Rotate to the next API key."""
    global current_index
    current_index = (current_index + 1) % len(keys)


def totalKeys():
    """Return the total number of API keys."""
    return len(keys)