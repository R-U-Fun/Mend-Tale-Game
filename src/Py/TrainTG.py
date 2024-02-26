import json
import tensorflow as tf
from transformers import TFGPT2LMHeadModel, AutoTokenizer
import datetime

with open('../../datasets/MT_DS_HP_01_TG_Test3.json', 'r') as f:
    data = json.load(f)

tokenizer = AutoTokenizer.from_pretrained('gpt2')
print("++++++++++++++++++++++++++++++++++++++++Initialize the tokenizer")

tokenizer.pad_token = tokenizer.eos_token
print("++++++++++++++++++++++++++++++++++++++++Set the padding token")

initial_texts = [item['Data']['InitialText'] for item in data]
target_texts = [item['Data']['TargetText'] for item in data]
print("++++++++++++++++++++++++++++++++++++++++Prepare the training data")

inputs = tokenizer(initial_texts, return_tensors='tf', truncation=True, padding=True)['input_ids']
labels = tokenizer(target_texts, return_tensors='tf', truncation=True, padding=True)['input_ids']
print("++++++++++++++++++++++++++++++++++++++++Encode the texts")

model = TFGPT2LMHeadModel.from_pretrained('gpt2')
print("++++++++++++++++++++++++++++++++++++++++Initialize the model")

loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
print("++++++++++++++++++++++++++++++++++++++++Define the loss")

model.compile(optimizer='adam', loss=loss)
print("++++++++++++++++++++++++++++++++++++++++Compile the model")

dataset = tf.data.Dataset.from_tensor_slices((inputs, labels))
print("++++++++++++++++++++++++++++++++++++++++Convert inputs and labels to TensorFlow Dataset object")

model.fit(dataset.batch(8), epochs=3)
print("++++++++++++++++++++++++++++++++++++++++Train the model")

model.save_pretrained("../../mt_ml_models/MT_ML_HP_01_TG_Test3_Model")
print("++++++++++++++++++++++++++++++++++++++++Save the model")


datetime = datetime.datetime.now()
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print(" ")
print(datetime)
print(" ")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")