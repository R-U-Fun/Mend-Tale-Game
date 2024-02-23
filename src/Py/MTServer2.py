from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline
from transformers import TFAutoModelForSequenceClassification, TFAutoModelForTokenClassification, AutoTokenizer, TFAutoModelWithLMHead
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
    print(UserResponse)
    inputs = tokenizer.encode(UserResponse, return_tensors='tf')
    outputs = model.generate(inputs, max_length=100, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
    generated_text = tokenizer.decode(outputs[0])
    print("-------------------------33333333")
    print(generated_text)
    split = generated_text.split(UserResponse)
    print("-------------------------33333333")
    print(split[1])
    inputs2 = tokenizer.encode(split[1], return_tensors='tf')
    outputs2 = model.generate(inputs2, max_length=200, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
    generated_text2 = tokenizer.decode(outputs2[0])
    print("-------------------------33333333")
    print(generated_text2)
    return jsonify(generated_text2)

if __name__ == '__main__':
    app.run(host='localhost')
