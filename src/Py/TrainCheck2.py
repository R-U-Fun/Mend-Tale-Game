from flask import Flask, jsonify, request
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

def SentimentAnalysis2(UserResponse):
    # Load the trained model
    model = load_model("../../mt_ml_models/MT_DS_HF_Train_Df_Mood_433_v7_Model")

    # Initialize the tokenizer
    tokenizer = Tokenizer(num_words=5000, oov_token='<UNK>')
    tokenizer.fit_on_texts([UserResponse])

    # Tokenize and pad the user's response
    sequences = tokenizer.texts_to_sequences([UserResponse])
    inputs = pad_sequences(sequences, maxlen=1024)

    # Make a prediction
    outputs = model.predict(inputs)
    #classes = ['Negative', 'Neutral', 'Postive']
    classes = ['Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear']

    prediction = classes[np.argmax(outputs)]
    print("outputs")
    print(outputs)
    print("-------------------------")
    print("-------------------------")
    print(UserResponse)
    print("-------------------------")
    print(prediction)
    print("-------------------------")
    print("-------------------------")
    print("-------------------------")
    return(prediction)

#UserResponse = "Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you'd expect to be involved in anything strange or mysterious, because they just didn't hold with such nonsense."
#UserResponse = "My friend killed himself by crashing his car into a school, killing ten people."

UserResponse = "I like this"

#UserResponse = "Love Love Love Love Love Love "
SentimentAnalysis2(UserResponse)
