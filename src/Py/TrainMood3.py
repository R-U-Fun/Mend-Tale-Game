import json
import tensorflow as tf
from transformers import TFGPT2LMHeadModel, AutoTokenizer, TFAutoModelForSequenceClassification
import numpy as np
import nlpaug.augmenter.word as naw
import datetime

import pandas as pd
from datasets import Dataset

F = pd.read_csv('../../datasets/MT_DS_HP1_Mood_Bal_v2.csv')
Dataset = Dataset.from_pandas(F)

print("++++++++++++++++++++++++++++++++++++++++Set the padding token")

TrainTestSplit = Dataset.train_test_split(test_size=0.2)
TrainDS = TrainTestSplit['train']
TestDS = TrainTestSplit['test']

print("++++++++++++++++++++++++++++++++++++++++Prepare the training data")

tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')
print("++++++++++++++++++++++++++++++++++++++++Initialize the tokenizer")

inputs = tokenizer(initial_texts, return_tensors='tf', truncation=True, padding=True, max_length=1024)['input_ids']
print("++++++++++++++++++++++++++++++++++++++++Encode the texts")

MoodsTF = tf.convert_to_tensor(Moods)

model = TFAutoModelForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=6)
print("++++++++++++++++++++++++++++++++++++++++Initialize the model")

loss = tf.keras.losses.CategoricalCrossentropy(from_logits=True)
print("++++++++++++++++++++++++++++++++++++++++Define the loss")

model.compile(optimizer='adam', loss=loss)
print("++++++++++++++++++++++++++++++++++++++++Compile the model")

dataset = tf.data.Dataset.from_tensor_slices((inputs, MoodsTF))
print("++++++++++++++++++++++++++++++++++++++++Convert inputs and labels to TensorFlow Dataset object")

model.fit(dataset.batch(64), epochs=3)
print("++++++++++++++++++++++++++++++++++++++++Train the model")

model.save_pretrained("../../mt_ml_models/MT_DS_HF_Train_Df_v2_Model")
print("++++++++++++++++++++++++++++++++++++++++Save the model")


datetime = datetime.datetime.now()
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print(" ")
print(datetime)
print(" ")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")