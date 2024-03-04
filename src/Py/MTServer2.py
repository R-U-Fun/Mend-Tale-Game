from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline
from transformers import TFAutoModelForSequenceClassification, TFAutoModelForTokenClassification, AutoTokenizer, TFAutoModelWithLMHead, TFGPT2LMHeadModel
import numpy as np

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)
CORS(app)

@app.route('/SentimentAnalysis', methods=['POST'])
def SentimentAnalysis():
    model_name = "distilbert-base-uncased-finetuned-sst-2-english"
    model = TFAutoModelForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    data = request.get_json()
    UserResponse = data.get('UserResponse', '')
    print(UserResponse)
    inputs = tokenizer(UserResponse, return_tensors='tf')
    outputs = model(inputs)[0]
    res = outputs.numpy().tolist()
    print("-------------------------")
    classes = ['Negative', 'Positive']
    prediction = classes[np.argmax(res)]
    print(prediction)
    return jsonify(prediction)

@app.route('/Tokenizer', methods=['POST'])
def Tokenizer():
    model_name = "distilbert-base-uncased-finetuned-sst-2-english"
    model = TFAutoModelForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    data = request.get_json()
    TokenizerText = data.get('TokenizerText', '')
    print(TokenizerText)
    sequence = TokenizerText
    print(sequence)
    res = tokenizer(sequence)
    print(res)
    tokens = tokenizer.tokenize(sequence)
    print(tokens)
    ids = tokenizer.convert_tokens_to_ids(tokens)
    print(ids)
    join = ", ".join(tokens)
    print(join)
    return jsonify(join)

@app.route('/NamedEntityRecognition', methods=['POST'])
def NamedEntityRecognition():
    ner_model = "dbmdz/bert-large-cased-finetuned-conll03-english"
    model = TFAutoModelForTokenClassification.from_pretrained(ner_model)
    tokenizer = AutoTokenizer.from_pretrained(ner_model)
    ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, framework="tf")
    data = request.get_json()
    NamedEntityRecognition = data.get('NamedEntityRecognition', '')
    print(NamedEntityRecognition)
    sequence = NamedEntityRecognition
    print(sequence)
    ner_results = ner_pipeline(sequence)
    return jsonify(ner_results)

@app.route('/TextGeneration', methods=['POST'])
def TextGeneration():
    model_name = "gpt2"
    model = TFAutoModelWithLMHead.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    data = request.get_json()
    UserResponse = data.get('UserResponse', '')
    print(UserResponse)
    inputs = tokenizer.encode(UserResponse, return_tensors='tf')
    outputs = model.generate(inputs, max_length=50, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
    generated_text = tokenizer.decode(outputs[0])
    print("-------------------------222222222222222222")
    print(generated_text)
    return jsonify(generated_text)

@app.route('/TextGeneration2', methods=['POST'])
def TextGeneration2():
    model_name = "gpt2"
    model = TFAutoModelWithLMHead.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    data = request.get_json()
    UserResponse = data.get('UserResponse', '')
    print("---------------------------------------------------------------------------------------")
    print(UserResponse)
    print("---------------------------------------------------------------------------------------")
    inputs = tokenizer.encode(UserResponse, return_tensors='tf')
    outputs = model.generate(inputs, max_length=1000, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
    generated_text = tokenizer.decode(outputs[0])
    print("-------------------------33333333")
    print(generated_text)
    split = generated_text.split(UserResponse)
    print("-------------------------33333333")
    print(split[1])
    split2 = split[1].split("<|endoftext|>")
    # inputs2 = tokenizer.encode(split[1], return_tensors='tf')
    # outputs2 = model.generate(inputs2, max_length=2000, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
    # generated_text2 = tokenizer.decode(outputs2[0])
    # print("-------------------------33333333")
    # print(generated_text2)
    # return jsonify(generated_text2)
    return jsonify(split2[0])


@app.route('/TextGeneration4', methods=['POST'])
def TextGeneration4():
    model_name = "gpt2"
    model = TFAutoModelWithLMHead.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    data = request.get_json()
    UserResponse = data.get('UserResponse', '')
    print("---------------------------------------------------------------------------------------")
    print(UserResponse)
    print("---------------------------------------------------------------------------------------")
    inputs = tokenizer.encode(UserResponse, return_tensors='tf')
    outputs = model.generate(inputs, max_length=1000, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
    generated_text = tokenizer.decode(outputs[0])
    print("-------------------------33333333")
    print(generated_text)
    split = generated_text.split(UserResponse)
    print("-------------------------33333333")
    print(split[1])
    split2 = split[1].split("<|endoftext|>")
    return jsonify(split2[0])

#==================================================================================================

@app.route('/SentimentAnalysis2', methods=['POST'])
def SentimentAnalysis2():
    model = TFAutoModelForSequenceClassification.from_pretrained("../../mt_ml_models/MT_DS_HF_Train_Df_v1_Model")
    tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')
    data = request.get_json()
    UserResponse = data.get('UserResponse', '')
    print(UserResponse)
    inputs = tokenizer(UserResponse, return_tensors='tf')
    outputs = model(inputs)[0]
    res = outputs.numpy().tolist()
    print("-------------------------")
    classes = ['Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear']
    prediction = classes[np.argmax(res)]
    print(prediction)
    return jsonify(prediction)


@app.route('/SentimentAnalysis3', methods=['POST'])
def SentimentAnalysis3():
    # Load the trained model
    model = load_model("../../mt_ml_models/MT_DS_HF_Train_Df_v1_Model")
    data = request.get_json()
    UserResponse = data.get('UserResponse', '')
    print(UserResponse)

    # Initialize the tokenizer
    tokenizer = Tokenizer(num_words=5000, oov_token='<UNK>')
    tokenizer.fit_on_texts([UserResponse])

    # Tokenize and pad the user's response
    sequences = tokenizer.texts_to_sequences([UserResponse])
    inputs = pad_sequences(sequences, maxlen=1024)

    # Make a prediction
    outputs = model.predict(inputs)
    classes = ['Negative', 'Neutral', 'Positive']
    prediction = classes[np.argmax(outputs)]
    print(UserResponse)
    print(prediction)
    return jsonify(prediction)

@app.route('/TextGeneration3', methods=['POST'])
def TextGeneration3():
    model = TFGPT2LMHeadModel.from_pretrained("../../mt_ml_models/MT_ML_HP_01_TG_Test_Model")
    tokenizer = AutoTokenizer.from_pretrained("gpt2")
    data = request.get_json()
    UserResponse = data.get('UserResponse', '')
    print(UserResponse)
    inputs = tokenizer.encode(UserResponse, return_tensors='tf')
    outputs = model.generate(inputs, max_length=500, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
    generated_text = tokenizer.decode(outputs[0])
    print(generated_text)
    return jsonify(generated_text)
    
    # print("-------------------------33333333")
    # print(generated_text)
    # split = generated_text.split(UserResponse)
    # print("-------------------------33333333")
    # print(split[1])
    # split2 = split[1].split("<|endoftext|>")
    # return jsonify(split2[0])

if __name__ == '__main__':
    app.run(host='localhost')
