from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification, TrainingArguments, Trainer
from transformers import DataCollatorWithPadding
from transformers import AutoModelForSequenceClassification, AutoTokenizer

import pandas as pd
from datasets import Dataset

df = pd.read_csv('../../datasets/MT_DS_HP1_Mood_Bal_v2.csv') # Make sure to change 'your_dataset.csv' to your actual file path
dataset = Dataset.from_pandas(df)
print("++++++++++++++++++++++++++++++++++++++++\n1\n++++++++++++++++++++++++++++++++++++++++")
train_test_split = dataset.train_test_split(test_size=0.2)
train_dataset = train_test_split['train']
test_dataset = train_test_split['test']

print("++++++++++++++++++++++++++++++++++++++++\n1\n++++++++++++++++++++++++++++++++++++++++")

model_checkpoint = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_checkpoint)

print("++++++++++++++++++++++++++++++++++++++++\n2\n++++++++++++++++++++++++++++++++++++++++")

def preprocess_data(examples):
    return tokenizer(examples['Data/InitialText'], truncation=True, padding=False)

print("++++++++++++++++++++++++++++++++++++++++\n3\n++++++++++++++++++++++++++++++++++++++++")

train_dataset = train_dataset.map(preprocess_data, batched=True)
test_dataset = test_dataset.map(preprocess_data, batched=True)

print("++++++++++++++++++++++++++++++++++++++++\n4\n++++++++++++++++++++++++++++++++++++++++")

label_list = train_dataset.unique('Data/Mood')
label2id = {label: id for id, label in enumerate(label_list)}
id2label = {id: label for label, id in label2id.items()}

print("++++++++++++++++++++++++++++++++++++++++\n5\n++++++++++++++++++++++++++++++++++++++++")

def label_encode(examples):
    examples['labels'] = [label2id[examples['Data/Mood']]]
    return examples

print("++++++++++++++++++++++++++++++++++++++++\n6\n++++++++++++++++++++++++++++++++++++++++")

train_dataset = train_dataset.map(label_encode)
test_dataset = test_dataset.map(label_encode)

print("++++++++++++++++++++++++++++++++++++++++\n7\n++++++++++++++++++++++++++++++++++++++++")

len(train_dataset)

len(test_dataset)

print("++++++++++++++++++++++++++++++++++++++++\n8\n++++++++++++++++++++++++++++++++++++++++")

data_collator = DataCollatorWithPadding(tokenizer=tokenizer, return_tensors="pt")

print("++++++++++++++++++++++++++++++++++++++++\n9\n++++++++++++++++++++++++++++++++++++++++")

model = AutoModelForSequenceClassification.from_pretrained(model_checkpoint, num_labels=len(label_list))

print("++++++++++++++++++++++++++++++++++++++++\n10\n++++++++++++++++++++++++++++++++++++++++")

training_args = TrainingArguments(
    output_dir='/content/results',
    num_train_epochs=1,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
    evaluation_strategy="steps", # Perform evaluation every `eval_steps` steps
    eval_steps=100, # Number of steps to perform evaluation
    # save_strategy="steps",
    # save_steps=100, # Save checkpoint every `save_steps` steps
    load_best_model_at_end=True, # Load the best model at the end of training
)

print("++++++++++++++++++++++++++++++++++++++++\n11\n++++++++++++++++++++++++++++++++++++++++")

model_directory = "../../mt_ml_models/MT_DS_HP1_Mood_Bal_v2_Model/"

print("++++++++++++++++++++++++++++++++++++++++\n12\n++++++++++++++++++++++++++++++++++++++++")

model = AutoModelForSequenceClassification.from_pretrained(model_directory)

print("++++++++++++++++++++++++++++++++++++++++\n13\n++++++++++++++++++++++++++++++++++++++++")

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    data_collator=data_collator,  # Add this line
)

print("++++++++++++++++++++++++++++++++++++++++\n14\n++++++++++++++++++++++++++++++++++++++++")

trainer.train()

print("++++++++++++++++++++++++++++++++++++++++\n15\n++++++++++++++++++++++++++++++++++++++++")

trainer.evaluate()

print("++++++++++++++++++++++++++++++++++++++++\n16\n++++++++++++++++++++++++++++++++++++++++")

def preprocess_input(text, device='cpu'):
    input_data = tokenizer(text, truncation=True, padding=True, return_tensors="pt")
    input_data = {key: value.to(device) for key, value in input_data.items()}  # Move tensors to the same device
    return input_data

print("++++++++++++++++++++++++++++++++++++++++\n17\n++++++++++++++++++++++++++++++++++++++++")

def predict_mood(text):
    input_data = preprocess_input(text, device=model.device)
    logits = model(**input_data).logits
    predicted_class = logits.argmax().item()
    predicted_label = id2label[predicted_class]
    return predicted_label

print("++++++++++++++++++++++++++++++++++++++++\n18\n++++++++++++++++++++++++++++++++++++++++")

custom_input = "She had scold a boy today"

predicted_mood = predict_mood(custom_input)
print("Predicted Mood:", predicted_mood)