import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

from logistic_regression import LogisticRegressionScratch


# =========================
# LOAD DATASET
# =========================

df = pd.read_csv(r"C:\Users\ROHIT\Downloads\vehicle_maintenance_data - Copy.csv")


# =========================
# BALANCE THE DATASET
# =========================

df_0 = df[df["Need_Maintenance"] == 0]
df_1 = df[df["Need_Maintenance"] == 1]

# Undersample class 1
df_1 = df_1.sample(len(df_0), random_state=42)

# Combine and shuffle
df = pd.concat([df_0, df_1]).sample(frac=1, random_state=42)

print("\nBalanced Dataset:")
print(df["Need_Maintenance"].value_counts())


# =========================
# ENCODE CATEGORICAL COLUMNS
# =========================

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


# Save encoders
joblib.dump(encoders, "encoders.pkl")


# =========================
# FEATURES AND TARGET
# =========================

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


# =========================
# TRAIN TEST SPLIT
# =========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# =========================
# FEATURE SCALING
# =========================

mean = X_train.mean(axis=0)
std = X_train.std(axis=0)

# Prevent division by zero
std[std == 0] = 1

X_train = (X_train - mean) / std
X_test = (X_test - mean) / std


# Save scaler
joblib.dump(
    {
        "mean": mean,
        "std": std
    },
    "scaler.pkl"
)


# =========================
# TRAIN CUSTOM MODEL
# =========================

model = LogisticRegressionScratch(
    learning_rate=0.01,
    epochs=1000
)

model.fit(X_train, y_train)


# =========================
# EVALUATE MODEL
# =========================

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\nAccuracy:", round(accuracy * 100, 2), "%")

print("\nClassification Report:")
print(classification_report(y_test, predictions))


# =========================
# SAVE MODEL
# =========================

joblib.dump(model, "model.pkl")

print("\nModel saved successfully!")