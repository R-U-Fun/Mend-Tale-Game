import json
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, Flatten
import numpy as np

# Load the data
with open('../../datasets/MT_DS_HP_01_split_434_Test_v1.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extract the texts and labels from the data
initial_texts = [item['Data']['InitialText'] for item in data]
labels = [item['Data']['Mood'] for item in data]

# Convert the labels to one-hot encoding
labels = to_categorical(labels, num_classes=7)

# Initialize the tokenizer
tokenizer = Tokenizer(num_words=5000, oov_token='<UNK>')
tokenizer.fit_on_texts(initial_texts)

# Tokenize and pad the texts
sequences = tokenizer.texts_to_sequences(initial_texts)
inputs = pad_sequences(sequences, maxlen=1024)

# Define your custom model architecture
model = Sequential([
    Embedding(input_dim=5000, output_dim=64, input_length=1024),
    Flatten(),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(64, activation='relu'),
    Dense(7, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(inputs, labels, epochs=100, batch_size=64)

# Save the trained model
model.save("../../mt_ml_models/MT_DS_HP_01_split_434_Test_v1_Model")
