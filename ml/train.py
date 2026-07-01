import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from logistic_regression import LogisticRegressionScratch


df = pd.read_csv(r"C:\Users\ROHIT\Downloads\vehicle_maintenance_data - Copy.csv")

categorical_columns = [
    "Vehicle_Model",
    "Maintenance_History",
    "Tire_Condition",
    "Brake_Condition",
    "Battery_Status"
]

encoders = {}

for col in categorical_columns:

    encoder = LabelEncoder()

    df[col] = encoder.fit_transform(df[col])

    encoders[col] = encoder

joblib.dump(encoders, "encoders.pkl")

X = df[
    [
        "Vehicle_Model",
        "Maintenance_History",
        "Reported_Issues",
        "Vehicle_Age",
        "Odometer_Reading",
        "Days_Since_Last_Service",
        "Accident_History",
        "Fuel_Efficiency",
        "Tire_Condition",
        "Brake_Condition",
        "Battery_Status"
    ]
].values


y = df["Need_Maintenance"].values


X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)


mean = X_train.mean(axis=0)
std = X_train.std(axis=0)

X_train = (X_train - mean) / std
X_test = (X_test - mean) / std

joblib.dump(
    {
        "mean": mean,
        "std": std
    },
    "scaler.pkl"
)


model = LogisticRegressionScratch(
    learning_rate=0.001,
    epochs=1000
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\nAccuracy:", round(accuracy * 100, 2), "%")

joblib.dump(model, "model.pkl")

print("\nModel saved successfully!")