from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask import Flask, jsonify, request
from flask_cors import CORS

from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
# Load the trained model
# model_directory = "../../mt_ml_models/MT_DS_HP1_Mood_Bal_v3_Model/"
# model = AutoModelForSequenceClassification.from_pretrained(model_directory)

# # Load the tokenizer
# tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# ID2Label = ['Neutral', 'Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear']

# Define a function to make predictions
def predict_mood(text):
    print("Input:", text)
    model_directory = "../../mt_ml_models/MT_DS_HP1_Mood_Bal_v6_Model/"
    model = AutoModelForSequenceClassification.from_pretrained(model_directory)

    # Load the tokenizer
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

    ID2Label = ['Neutral', 'Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear']

    input_data = tokenizer(text, truncation=True, padding=True, return_tensors="pt")
    logits = model(**input_data).logits
    predicted_class = logits.argmax().item()
    PredictedLabel = ID2Label[(predicted_class)-1]
    return PredictedLabel

# Example usage
input_text = "Someone knocks on the door"
predicted_class = predict_mood(input_text)
print("Predicted class:", predicted_class)

'''
Model = AutoModelForSequenceClassification.from_pretrained("../../mt_ml_models/MT_DS_HP1_Mood_Bal_v3_Model/")
Tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
Moods = ['Neutral', 'Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear']

@app.route('/SentimentAnalysis4', methods=['POST'])
def SentimentAnalysis4():
    data = request.get_json()
    UserResponse = data.get('UserResponse', '')
    print(UserResponse)

    InputData = Tokenizer(UserResponse, truncation=True, padding=True, return_tensors="pt")
    Logits = Model(**InputData).Logits
    PredictedClass = Logits.argmax().item()
    PredictedMood = Moods[(PredictedClass)-1]

    print("\n\nPredictedLabel: ", PredictedMood, "\n\n")
    return jsonify(PredictedMood)


StoryPrompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a story generator"                "Your story should be in conversation style"
            "Mood of the story is {Mood}"
            "Refer to main character as you"
            "Your stories should have elements of emotions and day to day things and slice of life"
            "Your response should end with a specific scenario for user to respond according to their wish."
            "Your output should be 100 words"
        ),
        ("human", "{text}"),
    ]
)

LLM = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key="API_KEY")

Runnable = StoryPrompt | LLM

@app.route('/TextGeneration4', methods=['POST'])
def GenerateStory():

    data = request.get_json()

    ChatHistory = data.get('UserResponse', '')
    print(ChatHistory[len(ChatHistory)-1])

    Mood = data.get('Mood', '')
    print(Mood)
    
    JoinedHistory = "\n".join(ChatHistory)

    StoryResponse = Runnable.invoke({"text": JoinedHistory, "Mood": Mood})

    StorySegment = str(StoryResponse) 
    
    ChatHistory.append(f"GameResponse: {StorySegment}")

    print("\n")
    print(StorySegment)
    print("\n")

    return jsonify(StorySegment)

# while True:
    
#     Prompt = input("User Input (Type 'exit' to quit):\n")
#     Mood = input("User Mood (Type 'exit' to quit):\n")
    
#     if Prompt.lower() == 'exit':
#         print("Goodbye!")
#         break
    
#     StorySegment, ChatHistory = GenerateStory(Prompt, Mood, ChatHistory)
    
#     print("\n")
#     print(StorySegment)
#     print("\n")

'''