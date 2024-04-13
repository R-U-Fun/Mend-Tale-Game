# from flask import Flask, jsonify, request
# from flask_cors import CORS
# # from transformers import pipeline, AutoModelForTokenClassification, AutoTokenizer
# # from transformers import TFAutoModelForSequenceClassification, TFAutoModelForTokenClassification, AutoTokenizer, TFAutoModelWithLMHead, TFGPT2LMHeadModel
# # import numpy as np

# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# # import torch

# from langchain_core.prompts import ChatPromptTemplate
# from langchain_openai import ChatOpenAI

# def OpenAIKey():
#     Key1 = "sk-UrqKfMDLy4bH"
#     Key2 = "60Nxft4JT3BlbkFJptKC"
#     Key3 = "Dk1iLXTXOAT0gebM"
#     FullKey=Key1+Key2+Key3
#     return(FullKey)

# APIKey=OpenAIKey()

# # from tensorflow.keras.models import load_model
# # from tensorflow.keras.preprocessing.text import Tokenizer
# # from tensorflow.keras.preprocessing.sequence import pad_sequences

# app = Flask(__name__)
# CORS(app)

# # @app.route('/SentimentAnalysis', methods=['POST'])
# # def SentimentAnalysis():
# #     model_name = "distilbert-base-uncased-finetuned-sst-2-english"
# #     model = TFAutoModelForSequenceClassification.from_pretrained(model_name)
# #     tokenizer = AutoTokenizer.from_pretrained(model_name)
# #     data = request.get_json()
# #     UserResponse = data.get('UserResponse', '')
# #     print(UserResponse)
# #     inputs = tokenizer(UserResponse, return_tensors='tf')
# #     outputs = model(inputs)[0]
# #     res = outputs.numpy().tolist()
# #     print("-------------------------")
# #     classes = ['Negative', 'Positive']
# #     prediction = classes[np.argmax(res)]
# #     print(prediction)
# #     return jsonify(prediction)

# # @app.route('/NamedEntityRecognition', methods=['POST'])
# # def NamedEntityRecognition():
# #     ner_model = "bert-base-uncased"
# #     model = TFAutoModelForTokenClassification.from_pretrained(ner_model)
# #     tokenizer = AutoTokenizer.from_pretrained(ner_model)
# #     ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, framework="tf")
# #     data = request.get_json()
# #     NamedEntityRecognition = data.get('NamedEntityRecognition', '')
# #     print(NamedEntityRecognition)
# #     sequence = str(NamedEntityRecognition)
# #     print(sequence)
# #     ner_results = ner_pipeline(NamedEntityRecognition)
# #     return jsonify(ner_results)

# # @app.route('/TextGeneration', methods=['POST'])
# # def TextGeneration():
# #     model_name = "gpt2"
# #     model = TFAutoModelWithLMHead.from_pretrained(model_name)
# #     tokenizer = AutoTokenizer.from_pretrained(model_name)
# #     data = request.get_json()
# #     UserResponse = data.get('UserResponse', '')
# #     print(UserResponse)
# #     inputs = tokenizer.encode(UserResponse, return_tensors='tf')
# #     outputs = model.generate(inputs, max_length=50, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
# #     generated_text = tokenizer.decode(outputs[0])
# #     print("-------------------------222222222222222222")
# #     print(generated_text)
# #     return jsonify(generated_text)

# # @app.route('/TextGeneration2', methods=['POST'])
# # def TextGeneration2():
# #     model_name = "gpt2"
# #     model = TFAutoModelWithLMHead.from_pretrained(model_name)
# #     tokenizer = AutoTokenizer.from_pretrained(model_name)
# #     data = request.get_json()
# #     UserResponse = data.get('UserResponse', '')
# #     print("---------------------------------------------------------------------------------------")
# #     print(UserResponse)
# #     print("---------------------------------------------------------------------------------------")
# #     inputs = tokenizer.encode(UserResponse, return_tensors='tf')
# #     outputs = model.generate(inputs, max_length=1000, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
# #     generated_text = tokenizer.decode(outputs[0])
# #     print("-------------------------33333333")
# #     print(generated_text)
# #     split = generated_text.split(UserResponse)
# #     print("-------------------------33333333")
# #     print(split[1])
# #     split2 = split[1].split("<|endoftext|>")
# #     # inputs2 = tokenizer.encode(split[1], return_tensors='tf')
# #     # outputs2 = model.generate(inputs2, max_length=2000, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
# #     # generated_text2 = tokenizer.decode(outputs2[0])
# #     # print("-------------------------33333333")
# #     # print(generated_text2)
# #     # return jsonify(generated_text2)
# #     return jsonify(split2[0])


# # @app.route('/TextGeneration33', methods=['POST'])
# # def TextGeneration4():
# #     model_name = "gpt2"
# #     model = TFAutoModelWithLMHead.from_pretrained(model_name)
# #     tokenizer = AutoTokenizer.from_pretrained(model_name)
# #     data = request.get_json()
# #     UserResponse = data.get('UserResponse', '')
# #     print("---------------------------------------------------------------------------------------")
# #     print(UserResponse)
# #     print("---------------------------------------------------------------------------------------")
# #     inputs = tokenizer.encode(UserResponse, return_tensors='tf')
# #     outputs = model.generate(inputs, max_length=1000, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
# #     generated_text = tokenizer.decode(outputs[0])
# #     print("-------------------------33333333")
# #     print(generated_text)
# #     split = generated_text.split(UserResponse)
# #     print("-------------------------33333333")
# #     print(split[1])
# #     split2 = split[1].split("<|endoftext|>")
# #     return jsonify(split2[0])

# #==================================================================================================

# # @app.route('/SentimentAnalysis2', methods=['POST'])
# # def SentimentAnalysis2():
# #     model = TFAutoModelForSequenceClassification.from_pretrained("../../mt_ml_models/MT_DS_HF_Train_Df_v1_Model")
# #     tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')
# #     data = request.get_json()
# #     UserResponse = data.get('UserResponse', '')
# #     print(UserResponse)
# #     inputs = tokenizer(UserResponse, return_tensors='tf')
# #     outputs = model(inputs)[0]
# #     res = outputs.numpy().tolist()
# #     print("-------------------------")
# #     classes = ['Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear']
# #     prediction = classes[np.argmax(res)]
# #     print(prediction)
# #     return jsonify(prediction)


# # @app.route('/SentimentAnalysis3', methods=['POST'])
# # def SentimentAnalysis3():
# #     # Load the trained model
# #     model = load_model("../../mt_ml_models/MT_DS_HF_Train_Df_v1_Model")
# #     data = request.get_json()
# #     UserResponse = data.get('UserResponse', '')
# #     print(UserResponse)

# #     # Initialize the tokenizer
# #     tokenizer = Tokenizer(num_words=5000, oov_token='<UNK>')
# #     tokenizer.fit_on_texts([UserResponse])

# #     # Tokenize and pad the user's response
# #     sequences = tokenizer.texts_to_sequences([UserResponse])
# #     inputs = pad_sequences(sequences, maxlen=1024)

# #     # Make a prediction
# #     outputs = model.predict(inputs)
# #     classes = ['Negative', 'Neutral', 'Positive']
# #     prediction = classes[np.argmax(outputs)]
# #     print(UserResponse)
# #     print(prediction)
# #     return jsonify(prediction)

# # @app.route('/TextGeneration3', methods=['POST'])
# # def TextGeneration3():
# #     model = TFGPT2LMHeadModel.from_pretrained("../../mt_ml_models/MT_ML_HP_01_TG_Test_Model")
# #     tokenizer = AutoTokenizer.from_pretrained("gpt2")
# #     data = request.get_json()
# #     UserResponse = data.get('UserResponse', '')
# #     print(UserResponse)
# #     inputs = tokenizer.encode(UserResponse, return_tensors='tf')
# #     outputs = model.generate(inputs, max_length=500, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
# #     generated_text = tokenizer.decode(outputs[0])
# #     print(generated_text)
# #     return jsonify(generated_text)
    
# #     # print("-------------------------33333333")
# #     # print(generated_text)
# #     # split = generated_text.split(UserResponse)
# #     # print("-------------------------33333333")
# #     # print(split[1])
# #     # split2 = split[1].split("<|endoftext|>")
# #     # return jsonify(split2[0])

# # @app.route('/NamedEntityRecognition2', methods=['POST'])
# # def NamedEntityRecognition2():
# #     ner_model = "bert-base-uncased"
# #     model = AutoModelForTokenClassification.from_pretrained(ner_model)
# #     tokenizer = AutoTokenizer.from_pretrained(ner_model)
# #     ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, framework="pt")
# #     data = request.get_json()
# #     NamedEntityRecognition = data.get('NamedEntityRecognition', '')
# #     print(NamedEntityRecognition)
# #     sequence = str(NamedEntityRecognition)
# #     print(sequence)
# #     ner_results = ner_pipeline(NamedEntityRecognition)

# #     for res in ner_results:
# #         res['score'] = float(res['score'])

# #     return jsonify(ner_results)

# Model = AutoModelForSequenceClassification.from_pretrained("Aaroophan/mend-tale-sentiment-analysis")
# Tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
# Moods = ['Neutral', 'Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear']

# @app.route('/SentimentAnalysis4', methods=['POST'])
# def SentimentAnalysis4():
#     data = request.get_json()
#     UserResponse = data.get('UserResponse', '')
#     print(UserResponse)
#     InputData = Tokenizer(UserResponse, truncation=True, padding=True, return_tensors="pt")
#     Logits = Model(**InputData).logits
#     PredictedClass = Logits.argmax().item()
#     PredictedMood = Moods[(PredictedClass)-1]

#     print("\nPredictedLabel: ", PredictedMood, "\n")
#     return jsonify(PredictedMood)


# StoryPrompt = ChatPromptTemplate.from_messages(
#     [
#         (
#             "system",
#             "You are a mystery story writer"
#             "The setting is: The main character is trapped in a room with six characters named Halin, Leo, Ethi, Skott, Ariadni and Frikyn each representing Happy, Love, Excite, Sad, Anger and Fear respectively. A stranger enters the room. All the people in the room has to escape the room by working together. Should they trust each other? Who is the stranger?"
#             "Your writing should be around the main character, the other six characters and the stranger, all trying to get out of the locked room."
#             "Mood of the scene is {Mood}"
#             "Refer to main character as you, refer to other characters with their name, refer to the stranger as The Stranger."
#             "In the story do not mention that the other characters represent moods"
#             "Your response should end with a specific scenario prompting user to respond"
#             "Your output should be 50 words"
#         ),
#         ("human", "{text}"),
#     ]
# )

# LLM = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key=APIKey)

# Runnable = StoryPrompt | LLM

# @app.route('/TextGeneration4', methods=['POST'])
# def GenerateStory():
#     data = request.get_json()
#     JoinedHistory = data.get('UserResponse', '')
#     Mood = data.get('Mood', '')
#     StoryResponse = Runnable.invoke({"text": JoinedHistory, "Mood": Mood})
#     StorySegment = StoryResponse.content
#     print(StorySegment)
#     return jsonify(StorySegment)

# # @app.route('/Tokenizer', methods=['POST'])
# # def Tokenizer():
# #     model_name = "bert-base-uncased"
# #     tokenizer = AutoTokenizer.from_pretrained(model_name)
# #     data = request.get_json()
# #     TokenizerText = data.get('TokenizerText', '')
# #     print(TokenizerText)
# #     sequence = TokenizerText
# #     print(sequence)
# #     res = tokenizer(sequence)
# #     print(res)
# #     tokens = tokenizer.tokenize(sequence)
# #     print(tokens)
# #     ids = tokenizer.convert_tokens_to_ids(tokens)
# #     print(ids)
# #     join = ", ".join(tokens)
# #     print(join)
# #     return jsonify(join)

# @app.route('/Tokenizer', methods=['POST'])
# def Tokenizer():
#     model_name = "bert-base-uncased"
#     tokenizer = AutoTokenizer.from_pretrained(model_name)
#     data = request.get_json()
#     TokenizerText = data.get('TokenizerText', '')
#     sequence = TokenizerText
#     tokens = tokenizer.tokenize(sequence)
#     join = ", ".join(tokens)
#     return jsonify(join)

# @app.route('/Test')
# def Test():
#     return('Test')

# if __name__ == '__main__':
#     app.run(host='localhost')

from flask import Flask, jsonify, request # type: ignore
from flask_cors import CORS # type: ignore

from transformers import AutoTokenizer, AutoModelForSequenceClassification # type: ignore

from langchain_core.prompts import ChatPromptTemplate # type: ignore
from langchain_openai import ChatOpenAI # type: ignore

def OpenAIKey():
    Key1 = "sk-UrqKfMDLy4bH"
    Key2 = "60Nxft4JT3BlbkFJptKC"
    Key3 = "Dk1iLXTXOAT0gebM"
    FullKey=Key1+Key2+Key3
    return(FullKey) 

APIKey=OpenAIKey()

app = Flask(__name__)
CORS(app)

@app.route('/Tokenizer', methods=['POST'])
def Tokenizer():
    model_name = "bert-base-uncased"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    data = request.get_json()
    TokenizerText = data.get('TokenizerText', '')
    sequence = TokenizerText
    tokens = tokenizer.tokenize(sequence)
    join = ", ".join(tokens)
    return jsonify(join)

Model = AutoModelForSequenceClassification.from_pretrained("Aaroophan/mend-tale-sentiment-analysis")
Tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
Moods = ['Neutral', 'Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear']

@app.route('/SentimentAnalysis4', methods=['POST'])
def SentimentAnalysis4():
    data = request.get_json()
    UserResponse = data.get('UserResponse', '')
    print(UserResponse)
    InputData = Tokenizer(UserResponse, truncation=True, padding=True, return_tensors="pt")
    Logits = Model(**InputData).logits
    PredictedClass = Logits.argmax().item()
    PredictedMood = Moods[(PredictedClass)-1]

    print("\nPredictedLabel: ", PredictedMood, "\n")
    return jsonify(PredictedMood)


StoryPrompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a mystery story writer"
            "The setting is: The main character is trapped in a room with six characters named Halin, Leo, Ethi, Skott, Ariadni and Frikyn each representing Happy, Love, Excite, Sad, Anger and Fear respectively. A stranger enters the room. All the people in the room has to escape the room by working together. Should they trust each other? Who is the stranger?"
            "Your writing should be around how the main character interacts with the other six characters and the stranger."
            "Mood of the scene is {Mood}"
            "Your response should end with a specific dialogue asked by {Mood}'s character, prompting user to respond"
            "Your output should not describe what the main character responded, but it should focus on what happens next."
            "Refer to main character as you, refer to other characters with their name, refer to the stranger as The Stranger."
            "In the story do not mention that the other characters represent moods"
            "Your output should be 75 words"
        ),
        ("human", "{text}"),
    ]
)

LLM = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, openai_api_key=APIKey)

Runnable = StoryPrompt | LLM

@app.route('/TextGeneration4', methods=['POST'])
def GenerateStory():
    data = request.get_json()
    JoinedHistory = data.get('UserResponse', '')
    Mood = data.get('Mood', '')
    print(Mood)
    StoryResponse = Runnable.invoke({"text": JoinedHistory, "Mood": Mood})
    StorySegment = StoryResponse.content
    print(StorySegment)
    return jsonify(StorySegment)

@app.route('/Test')
def Test():
    return('Test')

if __name__ == '__main__':
    app.run(host='localhost')
