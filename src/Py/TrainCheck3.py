from flask import Flask, jsonify, request
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
import numpy as np

def TextGeneration2(prompt):
    model = load_model("../../mt_ml_models/MT_DS_HP_AllInParts_TG_v1_Model")
    tokenizer = Tokenizer(num_words=10000, oov_token='<UNK>')  # Same tokenizer as the training code
    tokenizer.fit_on_texts([prompt])
    sequences = tokenizer.texts_to_sequences([prompt])
    inputs = [seq[:-1] for seq in sequences]  # Exclude the last word
    inputs = [np.array(seq) for seq in inputs]  # Convert list to numpy array
    inputs = [np.reshape(seq, (1, len(seq), 1)) for seq in inputs]
    output = model.predict(inputs)
    generated_sequence = np.argmax(output, axis=-1)
    generated_text = ' '.join([tokenizer.index_word.get(idx, '<UNK>') for idx in generated_sequence[0]])
    print('inputs--------------------------------------')
    print(inputs)
    print('output--------------------------------------')
    print(output)
    print('generated_sequence--------------------------')
    print(generated_sequence)
    print('prompt--------------------------------------')
    print(prompt)
    print('generated_text------------------------------')
    print(generated_text)
    return(generated_text)

prompt = "That guy is living his life very happily with his friends and family"
TextGeneration2(prompt)
