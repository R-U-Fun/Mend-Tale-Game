from flask import Flask, jsonify, request
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

def TextGeneration2(prompt):
    # Load the trained model
    model = load_model("../../mt_ml_models/MT_DS_HP_01_TG_v1_Model")

    # Initialize the tokenizer
    tokenizer = Tokenizer(num_words=5000, oov_token='<UNK>')
    tokenizer.fit_on_texts([prompt])

    # Tokenize and pad the prompt
    sequences = tokenizer.texts_to_sequences([prompt])
    inputs = pad_sequences(sequences, maxlen=1024)

    # Generate text
    output = model.predict(inputs)
    generated_sequence = np.argmax(output, axis=-1)



    # Convert the generated sequence of word indices back to words
    generated_text = ' '.join([tokenizer.index_word.get(idx, '<UNK>') for idx in generated_sequence[0]])

    print('------------------------------------')
    print(prompt)
    print('------------------------------------')
    print(generated_text)
    print('------------------------------------')
    return(generated_text)

prompt = "Once upon a time"
TextGeneration2(prompt)
