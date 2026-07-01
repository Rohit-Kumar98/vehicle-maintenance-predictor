import joblib
import numpy as np
import os
from django.conf import settings


BASE_DIR = settings.BASE_DIR

model_path = os.path.join(BASE_DIR, "..", "ml", "model.pkl")
scaler_path = os.path.join(BASE_DIR, "..", "ml", "scaler.pkl")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)


def predict(features):

    features = np.array(features).reshape(1, -1)

    # Feature scaling
    mean = scaler["mean"]
    std = scaler["std"]

    features = (features - mean) / std

    # Probability
    probability = model.predict_proba(features)[0]

    # Binary prediction
    prediction = int(probability >= 0.5)

    # Risk score
    risk_score = round(float(probability * 100), 2)

    return {
        "prediction": prediction,
        "risk_score": risk_score
    }