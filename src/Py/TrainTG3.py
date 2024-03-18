import os 
os.environ['TF_DISABLE_MKL'] = '1'
import json
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, LSTM, TimeDistributed
import numpy as np

import datetime

with open('../../datasets/MT_DS_HP_1_Split_TG.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

texts = [item['Data']['InitialText'] + ' ' + item['Data']['TargetText'] for item in data]

tokenizer = Tokenizer(num_words=10000, oov_token='<UNK>')  # Increase the vocabulary size
tokenizer.fit_on_texts(texts)

sequences = tokenizer.texts_to_sequences(texts)
inputs = [seq[:-1] for seq in sequences]  # Exclude the last word
targets = [seq[1:] for seq in sequences]  # Exclude the first word

# Convert lists to numpy arrays for better performance
inputs = [np.array(seq) for seq in inputs]
targets = [np.array(seq) for seq in targets]

model = Sequential([
    Embedding(input_dim=10000, output_dim=64),  # Increase the input dimension size
    LSTM(64, return_sequences=True),
    LSTM(64, return_sequences=True),
    LSTM(64, return_sequences=True),
    LSTM(64, return_sequences=True),
    TimeDistributed(Dense(10000, activation='softmax'))  # Increase the output dimension size
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

try:
    model.load_weights("../../mt_ml_models/MT_DS_HP_AllInParts_TG_v2_Weights.h5")
    print("++++++++++++++++++++++++++++++++WEIGHTS FOUND")
except:
    print("++++++++++++++++++++++++++++++++NO WEIGHTS FOUND")

L=0
# Train each sequence individually
for seq_input, seq_target in zip(inputs, targets):
    L=L+1
    print(L)
    model.fit(np.array([seq_input]), np.array([seq_target]), epochs=50)  # Increase the number of epochs

model.save_weights("../../mt_ml_models/MT_DS_HP_AllInParts_TG_v1_Weights.h5")

model.save("../../mt_ml_models/MT_DS_HP_AllInParts_TG_v1_Model")

datetime = datetime.datetime.now()

print(" ")
print(" ")
print(" ")
print(datetime)
print(" ")
print(" ")
print(" ")