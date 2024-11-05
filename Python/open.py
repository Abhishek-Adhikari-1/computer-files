from openai import OpenAI

client = OpenAI()

# client.api_key = "sk-proj-SlbJR50ThPSIaO9UzsHHT3BlbkFJUUfsH2ERuFOTUnVfSfTF"
# client.api_key = "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"


def chat_with_gpt(prompt):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.7,
    )
    return response.choices[0].message


if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit", "bye"]:
            break
        response = chat_with_gpt(user_input)
        print(f"ChatGPT: {response}")
