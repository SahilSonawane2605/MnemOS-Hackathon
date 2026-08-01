from google import genai
from keyManager import getKey

client = genai.Client(api_key=getKey())

for model in client.models.list():
    print("=" * 60)
    print("Name:", model.name)

    if hasattr(model, "supported_actions"):
        print("Supported actions:", model.supported_actions)

    if hasattr(model, "supported_generation_methods"):
        print("Supported generation methods:", model.supported_generation_methods)