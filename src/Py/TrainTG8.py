# Import necessary modules
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI


StoryPrompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a mystery story writer"
            "The setting is: The main character is trapped in a room with six characters named Halin, Leo, Ethi, Skott, Ariadni and Frikyn each representing Happy, Love, Excite, Sad, Anger and Fear respectively. A stranger enters the room. All the people in the room has to escape the room by working together. Should they trust each other? Who is the stranger?"
            "Your writing should be around the main character, the other six characters and the stranger, all trying to get out of the locked room."
            "Mood of the scene is {Mood}"
            "Refer to main character as you, refer to other characters with their name, refer to the stranger as The Stranger."
            "In the story do not mention that the other characters represent moods"
            "Your response should end with a specific scenario prompting user to respond"
            "Your output should be 50 words"
        ),
        ("human", "{text}"),
    ]
)

ChatHistory = []

LLM = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key="")

Runnable = StoryPrompt | LLM

def GenerateStory(UserResponse, Mood, ChatHistory):

    JoinedHistory = "\n".join(ChatHistory)
    ChatHistory.append(f"UserResponse: {UserResponse}")

    StoryResponse = Runnable.invoke({"text": JoinedHistory + "\nUserResponse: " + UserResponse, "Mood": Mood})

    StorySegment = StoryResponse.content 
    
    ChatHistory.append(f"GameResponse: {StorySegment}")

    return StorySegment, ChatHistory


while True:
    
    Prompt = input("User Input (Type 'exit' to quit):\n")
    Mood = input("User Mood (Type 'exit' to quit):\n")
    
    if Prompt.lower() == 'exit':
        print("Goodbye!")
        break
    
    StorySegment, ChatHistory = GenerateStory(Prompt, Mood, ChatHistory)
    
    print("\n")
    print(StorySegment)
    print("\n")
