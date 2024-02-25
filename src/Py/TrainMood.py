import json
import tensorflow as tf
from transformers import TFGPT2LMHeadModel, AutoTokenizer, TFAutoModelForSequenceClassification
import numpy as np

with open('../../datasets/MT_DS_HP_01_Mood_Test.json', 'r') as f:
    data = json.load(f)

print("++++++++++++++++++++++++++++++++++++++++Set the padding token")

initial_texts = [item['Data']['InitialText'] for item in data]
Mood1 = [item['Data']['Mood']['Happy'] for item in data]
Mood2 = [item['Data']['Mood']['Love'] for item in data]
Mood3 = [item['Data']['Mood']['Excite'] for item in data]
Mood4 = [item['Data']['Mood']['Sad'] for item in data]
Mood5 = [item['Data']['Mood']['Anger'] for item in data]
Mood6 = [item['Data']['Mood']['Fear'] for item in data]

Moods = [list(item['Data']['Mood'].values()) for item in data]

print("++++++++++++++++++++++++++++++++++++++++Prepare the training data")
print(Mood1)


tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')
print("++++++++++++++++++++++++++++++++++++++++Initialize the tokenizer")

#tokenizer.pad_token = tokenizer.eos_token

inputs = tokenizer(initial_texts, return_tensors='tf', truncation=True, padding=True)['input_ids']
print("++++++++++++++++++++++++++++++++++++++++Encode the texts")

# Convert the moods to TensorFlow tensors
MoodsTF = tf.convert_to_tensor(Moods)

model = TFAutoModelForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=6)
print("++++++++++++++++++++++++++++++++++++++++Initialize the model")

loss = tf.keras.losses.CategoricalCrossentropy(from_logits=True)
print("++++++++++++++++++++++++++++++++++++++++Define the loss")

model.compile(optimizer='adam', loss=loss)
print("++++++++++++++++++++++++++++++++++++++++Compile the model")

# Create a TensorFlow dataset
dataset = tf.data.Dataset.from_tensor_slices((inputs, MoodsTF))
print("++++++++++++++++++++++++++++++++++++++++Convert inputs and labels to TensorFlow Dataset object")

model.fit(dataset.batch(8), epochs=3)
print("++++++++++++++++++++++++++++++++++++++++Train the model")

model.save_pretrained("../../mt_ml_models/MT_ML_HP_01_Mood_Test_Model")

def SentimentAnalysis2(UserResponse):
    model = TFAutoModelForSequenceClassification.from_pretrained("../../mt_ml_models/MT_ML_HP_01_Mood_Test_Model")
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