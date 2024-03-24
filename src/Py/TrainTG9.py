'''
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

StoryPrompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a mystery story writer"
            "The setting is: The main character is trapped in a room with six characters named Halin, Leo, Ethi, Skott, Ariadni and Frikyn each representing Happy, Love, Excite, Sad, Anger and Fear respectively. A stranger enters the room. All the people in the room has to escape the room by working together. Should they trust each other? Who is the stranger?"
            "Your writing should be around the main character, the other six characters and the stranger"
            "Mood of the scene is {Mood}"
            "Refer to main character as you, refer to other characters with their name, refer to the stranger as The Stranger."
            "In the story do not mention that the other characters represent moods"
            "Your response should end with a specific scenario prompting user to respond"
            "Your output should be 50 words"
        ),
        ("human", "{text}"),
    ]
)

LLM = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key="API_KEY")

Runnable = StoryPrompt | LLM

def GenerateStory(JoinedChatHistory, Mood):

    StoryResponse = Runnable.invoke({"text": JoinedChatHistory, "Mood": Mood})

    StorySegment = StoryResponse.content
    
    print("\n")
    print(StorySegment)
    print("\n")

    return(StorySegment)


JoinedChatHistory = "System: In a room, there are six people: Halin, Leo, Ethi, Skott, Ariadni, and Frikyn. You feel nervous. Someone knocks on the door. It opens slowly. A shadowy figure stands there. Things feel tense. What will you do?\nUser: Ask if the others know the stanger."

Mood = "Neutral"

GenerateStory(JoinedChatHistory, Mood)
'''


from transformers import GPT2LMHeadModel, GPT2Tokenizer

def load_model_and_tokenizer(model_name='gpt2'):
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    model = GPT2LMHeadModel.from_pretrained(model_name)
    return tokenizer, model

def generate_story(tokenizer, model, iprompt, mood, max_length=300):

    prompt = "You are a mystery story writer. The setting is: "+iprompt+" A stranger enters the room. All the people in the room have to escape the room by working together. Should they trust each other? Who is the stranger? Your writing should be around the main character, the other six characters and the stranger. Mood of the scene is "+mood+". Refer to main character as you, refer to other characters with their name, refer to the stranger as The Stranger. In the story do not mention that the other characters represent moods. Your response should end with a specific scenario prompting user to respond. Your output should be 50 words."
    inputs = tokenizer.encode(prompt, return_tensors='pt')
    outputs = model.generate(inputs, max_length=max_length, do_sample=True, temperature=0.9)
    story_segment = tokenizer.decode(outputs[0, inputs.shape[-1]:], skip_special_tokens=True)
    print("\n")
    print(story_segment)
    print("\n")
    return story_segment

tokenizer, model = load_model_and_tokenizer()



prompt = "System: In a room, there are six people: Halin, Leo, Ethi, Skott, Ariadni, and Frikyn. You feel nervous. Someone knocks on the door. It opens slowly. A shadowy figure stands there. Things feel tense. What will you do?\nUser: Ask if the others know the stanger."
mood = "Neutral"

generate_story(tokenizer, model, prompt, mood)
