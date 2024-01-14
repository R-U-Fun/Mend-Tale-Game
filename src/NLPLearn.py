from flask import Flask, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

@app.route('/sentiment_analysis', methods=['GET'])
def sentiment_analysis():
    classifier = pipeline("sentiment-analysis")
    res = classifier("I've been waiting for a HuggingFace course my whole life.")
    return jsonify(res)

if __name__ == '__main__':
    app.run(host='localhost')
