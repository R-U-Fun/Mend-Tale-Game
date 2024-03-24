from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification, TrainingArguments, Trainer
from transformers import DataCollatorWithPadding
from transformers import AutoModelForSequenceClassification, AutoTokenizer

import pandas as pd
from datasets import Dataset

import os

import datetime

print("++++++++++++++++++++++++++++++++++++++++\n1\n++++++++++++++++++++++++++++++++++++++++")

F = pd.read_csv('../../datasets/MT_DS_HP1_Mood_Bal_v2.csv')
Dataset = Dataset.from_pandas(F)

print("++++++++++++++++++++++++++++++++++++++++\n1\n++++++++++++++++++++++++++++++++++++++++")

TrainTestSplit = Dataset.train_test_split(test_size=0.2)
TrainDS = TrainTestSplit['train']
TestDS = TrainTestSplit['test']

print("++++++++++++++++++++++++++++++++++++++++\n2\n++++++++++++++++++++++++++++++++++++++++")

ModelCheckpoint = "bert-base-uncased"
Tokenizer = AutoTokenizer.from_pretrained(ModelCheckpoint)

print("++++++++++++++++++++++++++++++++++++++++\n3\n++++++++++++++++++++++++++++++++++++++++")

def PreProcessData(Egs):
    return Tokenizer(Egs['Data/InitialText'], truncation=True, padding=False)

print("++++++++++++++++++++++++++++++++++++++++\n4\n++++++++++++++++++++++++++++++++++++++++")

TrainDS = TrainDS.map(PreProcessData, batched=True)
TestDS = TestDS.map(PreProcessData, batched=True)

print("++++++++++++++++++++++++++++++++++++++++\n5\n++++++++++++++++++++++++++++++++++++++++")

LabelList = TrainDS.unique('Data/Mood')
Label2ID = {Label: ID for ID, Label in enumerate(LabelList)}
ID2Label = {ID: Label for Label, ID in Label2ID.items()}

print("++++++++++++++++++++++++++++++++++++++++\n6\n++++++++++++++++++++++++++++++++++++++++")

def LabelEncode(Egs):
    Egs['labels'] = [Label2ID[Egs['Data/Mood']]]
    return Egs

print("++++++++++++++++++++++++++++++++++++++++\n7\n++++++++++++++++++++++++++++++++++++++++")

TrainDS = TrainDS.map(LabelEncode)
TestDS = TestDS.map(LabelEncode)

print("++++++++++++++++++++++++++++++++++++++++\n8\n++++++++++++++++++++++++++++++++++++++++")

len(TrainDS)

len(TestDS)

print("++++++++++++++++++++++++++++++++++++++++\n9\n++++++++++++++++++++++++++++++++++++++++")

DataCollator = DataCollatorWithPadding(tokenizer=Tokenizer, return_tensors="pt")

print("++++++++++++++++++++++++++++++++++++++++\n10\n++++++++++++++++++++++++++++++++++++++++")

Model = AutoModelForSequenceClassification.from_pretrained(ModelCheckpoint, num_labels=len(LabelList))

print("++++++++++++++++++++++++++++++++++++++++\n11\n++++++++++++++++++++++++++++++++++++++++")

TrainingArgs = TrainingArguments(
    output_dir='../../mt_ml_models/content/results',
    num_train_epochs=10,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='../../mt_ml_models/logs',
    logging_steps=10,
    evaluation_strategy="steps",
    eval_steps=100,
    load_best_model_at_end=True,
)

print("++++++++++++++++++++++++++++++++++++++++\n12\n++++++++++++++++++++++++++++++++++++++++")

ModelDirectory = "../../mt_ml_models/PreTrainedModel/"

print("++++++++++++++++++++++++++++++++++++++++\n13\n++++++++++++++++++++++++++++++++++++++++")

Model = AutoModelForSequenceClassification.from_pretrained(ModelDirectory)

print("++++++++++++++++++++++++++++++++++++++++\n14\n++++++++++++++++++++++++++++++++++++++++")

Trainer = Trainer(
    model=Model,
    args=TrainingArgs,
    train_dataset=TrainDS,
    eval_dataset=TestDS,
    data_collator=DataCollator,
)

print("++++++++++++++++++++++++++++++++++++++++\n15\n++++++++++++++++++++++++++++++++++++++++")

Trainer.train()

print("++++++++++++++++++++++++++++++++++++++++\n16\n++++++++++++++++++++++++++++++++++++++++")

Trainer.evaluate()

# Save the trained model to a directory
output_model_dir = "../../mt_ml_models/MT_DS_HP1_Mood_Bal_v3_Model/"

# Create the directory if it doesn't exist
os.makedirs(output_model_dir, exist_ok=True)

print("++++++++++++++++++++++++++++++++++++++++\n16.1\n++++++++++++++++++++++++++++++++++++++++")

# Save the model
Trainer.save_model(output_model_dir)

print("++++++++++++++++++++++++++++++++++++++++\n16.2\n++++++++++++++++++++++++++++++++++++++++")

print("Trained model saved to:", output_model_dir)

print("++++++++++++++++++++++++++++++++++++++++\n17\n++++++++++++++++++++++++++++++++++++++++")

def PreProcessInput(Text, device='cpu'):
    InputData = Tokenizer(Text, truncation=True, padding=True, return_tensors="pt")
    InputData = {key: value.to(device) for key, value in InputData.items()}
    return InputData

print("++++++++++++++++++++++++++++++++++++++++\n18\n++++++++++++++++++++++++++++++++++++++++")

def PredictMood(Text):
    InputData = PreProcessInput(Text, device=Model.device)
    Logits = Model(**InputData).logits
    PredictedClass = Logits.argmax().item()
    PredictedLabel = ID2Label[PredictedClass]
    return PredictedLabel

print("++++++++++++++++++++++++++++++++++++++++\n19\n++++++++++++++++++++++++++++++++++++++++")

CustomInput = "She had scold a boy today"

PredictedMood = PredictMood(CustomInput)
print("Predicted Mood:", PredictedMood)

print("++++++++++++++++++++++++++++++++++++++++\n20\n++++++++++++++++++++++++++++++++++++++++")

datetime = datetime.datetime.now()
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print(" ")
print(datetime)
print(" ")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
print("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
