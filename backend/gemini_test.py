import traceback
from google import genai
from keyManager import getKey

MODEL = "gemini-flash-latest"

print("Using model:", MODEL)

try:
    client = genai.Client(api_key=getKey())

    response = client.models.generate_content(
        model=MODEL,
        contents="Say hello."
    )

    print(response.text)

except Exception:
    traceback.print_exc()