from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline
from transformers import TFAutoModelForSequenceClassification, TFAutoModelForTokenClassification, AutoTokenizer
import numpy as np

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
    print("-------------------------------")
    print(ner_results)
    print("-------------------------------")
    return jsonify(ner_results)

@app.route('/TextGeneration', methods=['POST'])
def TextGeneration():
    ner_model = "dbmdz/bert-large-cased-finetuned-conll03-english"
    model = TFAutoModelForTokenClassification.from_pretrained(ner_model)
    tokenizer = AutoTokenizer.from_pretrained(ner_model)
    ner_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, framework="tf")
    data = request.get_json()
    TextGeneration = data.get('TextGeneration', '')
    print(TextGeneration)
    sequence = TextGeneration
    print(sequence)
    ner_results = ner_pipeline(sequence)
    print("-------------------------------")
    print(ner_results)
    print("-------------------------------")
    return jsonify(ner_results)

if __name__ == '__main__':
    app.run(host='localhost')
