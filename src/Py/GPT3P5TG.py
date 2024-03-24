from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

chat_history = []

# Setup the storytelling prompt template
storytelling_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a creative story generator inspired by the magical universe of Harry Potter. "
            "Craft an engaging and imaginative short story based on the user's input. "
            "Your stories should captivate the reader with elements of magic, adventure, and the fantastical. "
        ),
        ("human", "{text}"),
    ]
)

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key="API_KEY")
runnable = storytelling_prompt | llm

def generate_magical_story(prompt, chat_history):
    # Ensure chat history is correctly formatted for the model
    formatted_history = "\n".join(chat_history)
    # Append the new user prompt to the chat history
    chat_history.append(f"Human: {prompt}")

    # Invoke the LLM to generate a story based on the updated chat history
    story_response = runnable.invoke({"text": formatted_history + "\nHuman: " + prompt})

    # Here, make sure story_response is a string. Adjust this line according to how you receive the response.
    story_segment = str(story_response)  # Adjust this based on how you access the response text from your setup

    # Append the generated story segment to the chat history
    chat_history.append(f"AI: {story_segment}")

    return story_segment, chat_history

while True:
    prompt = input("Enter a brief description or keywords for your magical story (Type 'exit' to quit):\n")
    if prompt.lower() == 'exit':
        print("Goodbye!")
        break
    story_segment, chat_history = generate_magical_story(prompt, chat_history)
    print("\nHere's your magical story segment:\n")
    print(story_segment)
    print("\n--- End of the story segment ---\n")