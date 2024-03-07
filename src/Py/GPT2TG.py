from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline
from transformers import TFAutoModelForSequenceClassification, TFAutoModelForTokenClassification, AutoTokenizer, TFAutoModelWithLMHead, TFGPT2LMHeadModel
import numpy as np

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

def TextGeneration(prompt):
    model_name = "gpt2"
    model = TFAutoModelWithLMHead.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    UserResponse = prompt
    print(UserResponse)
    inputs = tokenizer.encode(UserResponse, return_tensors='tf')
    outputs = model.generate(inputs, max_length=50, num_return_sequences=1, temperature=0.2, top_k=50, top_p=0.95, repetition_penalty=1.2)
    generated_text = tokenizer.decode(outputs[0])
    print("-------------------------222222222222222222")
    print(generated_text)
    return(generated_text)

prompt = "That guy is living his life very happily with his friends and family"
TextGeneration(prompt)