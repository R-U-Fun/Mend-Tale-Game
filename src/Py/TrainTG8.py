# Import necessary modules
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI


StoryPrompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a storywriter" 
            "Your story should be in breif conversation style"
            "Mood of the shot is {Mood}"
            "Refer to main character as you"
            "Your story should be emotional"
            "Your response should end with open end scenario for user to respond"
            "Your output should be 50 words"
        ),
        ("human", "{text}"),
    ]
)

ChatHistory = []

LLM = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key="API_KEY")

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
