import sys
import asyncio
try:
    import readline
except ImportError:
    pass
import logging

from mnemosService import (
    get_relevant_memories,
    generate_response,
    append_to_history,
)
from prompt import build_prompt

logger = logging.getLogger(__name__)

# ─── State ────────────────────────────────────────────────────────────────────
chat_history = []

# ─── CLI Helper Functions ──────────────────────────────────────────────────────
def show_help():
    print("\n💡 MnemOS CLI Help & Commands:")
    print("  /help     - Show available CLI commands")
    print("  /clear    - Clear current conversation history")
    print("  /history  - Display active conversation history")
    print("  exit      - Exit the MnemOS CLI safely\n")

def show_history():
    if not chat_history:
        print("\n📜 Conversation history is currently empty.")
        return
    print("\n📜 Current Conversation History:")
    for entry in chat_history:
        print(f"  {entry}")
    print()

# ─── Main Chat Loop ───────────────────────────────────────────────────────────
def prompt_user():
    while True:
        try:
            user_input = input("\n💬 You: ").strip()

            if not user_input:
                continue

            command = user_input.lower()

            # Command Handling
            if command == "exit":
                print("\n👋 Goodbye! Your memories are safe.\n")
                break

            elif command == "/help":
                show_help()
                continue

            elif command == "/clear":
                chat_history.clear()
                print("\n🧹 Chat history cleared.")
                continue

            elif command == "/history":
                show_history()
                continue

            # Core Interaction
            append_to_history(chat_history, "User", user_input)

            memories = get_relevant_memories(user_input)

            prompt = build_prompt(
                user_input,
                memories,
                chat_history
            )

            print("\n🧠 MnemOS is thinking...")

            response_text = asyncio.run(
                generate_response(prompt)
            )

            if not response_text:
                print("\n🤖 MnemOS: Unable to generate a response.")
                continue

            print(f"\n🤖 MnemOS: {response_text}")

            append_to_history(
                chat_history,
                "MnemOS",
                response_text
            )

        except (KeyboardInterrupt, EOFError):
            print("\n👋 Goodbye! Your memories are safe.\n")
            break
        except Exception:
            logger.exception("Unexpected error in CLI loop")
            print("\n❌ An unexpected error occurred. Please try again.")

# ─── Entry Point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)s: %(message)s"
    )

    print("\n╔══════════════════════════════════════╗")
    print("║    🧠  MnemOS Memory Core Online     ║")
    print("╚══════════════════════════════════════╝")
    print('  Type your question, "/help" for commands, or "exit" to quit.\n')

    prompt_user()