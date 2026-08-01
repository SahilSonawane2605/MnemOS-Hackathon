from dotenv import load_dotenv
import os

# Load variables from .env
load_dotenv()

# Get all environment variables that start with GOOGLE_API_KEY_
keys = sorted(
    key for key in os.environ
    if key.startswith("GOOGLE_API_KEY_")
)

print(keys)