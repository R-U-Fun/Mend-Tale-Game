from flask import Flask, jsonify, request
from flask_cors import CORS
import tensorflow as tf
from transformers import pipeline
from transformers import TFAutoModelForSequenceClassification, TFAutoModelForTokenClassification, AutoTokenizer, TFAutoModelWithLMHead, TFGPT2LMHeadModel
import numpy as np

import datetime

def TextGeneration3(UserResponse):
    model = TFGPT2LMHeadModel.from_pretrained("../../mt_ml_models/MT_ML_HP_01_TG_Test2_Model")
    tokenizer = AutoTokenizer.from_pretrained("gpt2")
    tokenizer.pad_token = tokenizer.eos_token

    # Encode the input while paying attention to all tokens
    inputs = tokenizer.encode(UserResponse, return_tensors='tf', padding='longest', truncation=True, max_length=512)
    attention_mask = tf.ones(inputs.shape, dtype=tf.int32)
     # Generate text
    outputs = model.generate(inputs, max_length=500, num_return_sequences=1, temperature=0.9, top_k=50, do_sample=True, repetition_penalty=1.2, pad_token_id=tokenizer.eos_token_id, attention_mask=attention_mask)
    generated_text = tokenizer.decode(outputs[0])
    print(generated_text)
    return(generated_text)


def SentimentAnalysis2(UserResponse):
    model = TFAutoModelForSequenceClassification.from_pretrained("../../mt_ml_models/MT_ML_HP_01_Mood_Test3_Model")
    tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')
    inputs = tokenizer(UserResponse, return_tensors='tf')
    outputs = model(inputs)[0]
    res = outputs.numpy().tolist()
    print("-------------------------")
    classes = ['Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear']
    prediction = classes[np.argmax(res)]
    print(prediction)
    return(prediction)

UserResponse = "Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you'd expect to be involved in anything strange or mysterious, because they just didn't hold with such nonsense."

SentimentAnalysis2(UserResponse)

#TextGeneration3(UserResponse)


datetime = datetime.datetime.now()
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print(" ")
print(datetime)
print(" ")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")