# Import necessary modules
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

# Define the storytelling prompt
StoryPrompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a story generator"
            "Your story should be in conversation style"
            "Refer to main character as you"
            "Your stories should have elements of emotions and day to day things and slice of life"
            "Your response should end with a specific scenario for user to respond according to their wish."
            "Your output should be 100 words"
        ),
        ("human", "{text}"),
    ]
)

# Initialize an empty chat history
ChatHistory = []

# Initialize the language model
LLM = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key="API_KEY")
# Define the runnable
Runnable = StoryPrompt | LLM

# Define a function to generate a story
def GenerateStory(Prompt, ChatHistory):
    # Ensure chat history is correctly formatted for the model
    FormattedHistory = "\n".join(ChatHistory)
    # Append the new user prompt to the chat history
    ChatHistory.append(f"Human: {Prompt}")

    # Invoke the LLM to generate a story based on the updated chat history
    StoryResponse = Runnable.invoke({"text": FormattedHistory + "\nHuman: " + Prompt})

    # Here, make sure StoryResponse is a string. Adjust this line according to how you receive the response.
    StorySegment = str(StoryResponse)  # Adjust this based on how you access the response text from your setup

    # Append the generated story segment to the chat history
    ChatHistory.append(f"AI: {StorySegment}")

    return StorySegment, ChatHistory

# Start a loop to continuously generate stories
while True:
    # Get user input
    Prompt = input("User Input (Type 'exit' to quit):\n")
    # If the user types 'exit', break the loop
    if Prompt.lower() == 'exit':
        print("Goodbye!")
        break
    # Generate a story segment and update the chat history
    StorySegment, ChatHistory = GenerateStory(Prompt, ChatHistory)
    # Print the story segment
    print("\n\n")
    print(StorySegment)
    print("\n\n")
