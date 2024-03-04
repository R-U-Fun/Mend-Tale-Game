import json
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, LSTM, TimeDistributed
import numpy as np

# Load the data
with open('../../datasets/MT_DS_HP_01_TG.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extract the texts from the data
texts = [item['Data']['InitialText'] + ' ' + item['Data']['TargetText'] for item in data]

# Initialize the tokenizer
tokenizer = Tokenizer(num_words=10000, oov_token='<UNK>')  # Increase the vocabulary size
tokenizer.fit_on_texts(texts)

# Tokenize the texts
sequences = tokenizer.texts_to_sequences(texts)

# Prepare the input and target sequences
inputs = [seq[:-1] for seq in sequences]  # Exclude the last word
targets = [seq[1:] for seq in sequences]  # Exclude the first word

# Pad the sequences
inputs = pad_sequences(inputs, maxlen=1024)
targets = pad_sequences(targets, maxlen=1024)

# Reshape targets to match the output shape
targets = targets.reshape(*targets.shape, 1)

# Define your custom model architecture
model = Sequential([
    Embedding(input_dim=10000, output_dim=64, input_length=1024),  # Increase the input dimension size
    LSTM(128, return_sequences=True),
    LSTM(128, return_sequences=True),
    TimeDistributed(Dense(10000, activation='softmax'))  # Increase the output dimension size
])

# Compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(inputs, targets, epochs=10, batch_size=64, validation_split=0.2)  # Increase the number of epochs and add a validation split

# Save the trained model
model.save("../../mt_ml_models/MT_DS_HP_01_TG_v1_Model")
