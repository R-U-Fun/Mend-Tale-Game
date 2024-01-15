from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer
import numpy as np

app = Flask(__name__)
CORS(app)

model_name = "distilbert-base-uncased-finetuned-sst-2-english"
model = TFAutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

def softmax(logits):
    exps = np.exp(logits)
    return exps / np.sum(exps)

@app.route('/SentimentAnalysis', methods=['POST'])
def SentimentAnalysis():
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

@app.route('/NamedEntityRecognition', methods=['POST'])
def NamedEntityRecognition():
    data = request.get_json()
    NamedEntityRecognition = data.get('NamedEntityRecognition', '')
    print(NamedEntityRecognition)
    sequence = NamedEntityRecognition
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

if __name__ == '__main__':
    app.run(host='localhost')
