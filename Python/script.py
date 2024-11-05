import google.generativeai as genai
import pyperclip
import keyboard
import time

API_KEY = "AIzaSyAQEAOYOeqQy-Yri-c5qTNrl2ORjjEeCbo"

# API_KEY = "AIzaSyD3vwaCMcxkgyOGCTYqm_NoTNmNy9PqZN4"

genai.configure(api_key=API_KEY)
instruction = "In this conversation Answer as concisely as possible, Answer directly don't explain just answer"

generate_config = {
    "temperature": 0.7,
    "top_p": 1,
    "top_k": 1,
}

saftey_settings = [
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]


# Setting up the environment as it will remember the conversation
model = genai.GenerativeModel(
    "gemini-1.5-pro-exp-0801",
    generation_config=generate_config,
    safety_settings=saftey_settings,
)
convo = model.start_chat()
convo.send_message(instruction)


def gen_ai(prompt):
    response = convo.send_message(prompt)
    return response


def clear_selection():
    pyperclip.copy("")


def process_selection():
    time.sleep(0.1)
    selected_text = pyperclip.paste() if pyperclip.paste() else "Hello"
    if selected_text:
        pyperclip.copy("")
        response = gen_ai(selected_text.strip())
        if response:
            pyperclip.copy(response.candidates[0].content.parts[0].text.strip())


keyboard.add_hotkey("ctrl+alt+p", process_selection)
keyboard.add_hotkey("ctrl+alt+k", clear_selection)

print(
    """
    Press Ctrl+Alt+P to generate response based on current selection.
    Press Ctrl+Alt+K to clear current selection.
    Press Esc to exit.
    """
)

keyboard.wait("esc")
