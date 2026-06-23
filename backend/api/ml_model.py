import joblib
import numpy as np
import os
from django.conf import settings

BASE_DIR = settings.BASE_DIR
model_path = os.path.join(BASE_DIR, "..", "ml", "model.pkl")

model = joblib.load(model_path)


def predict(data):
    data = np.array(data).reshape(1, -1)

    pred = model.predict(data)[0]

    # Risk score (SAFE VERSION)
    if hasattr(model, "predict_proba"):
        prob = model.predict_proba(data)[0][1]
        risk_score = float(prob * 100)
    else:
        # fallback if model doesn't support probability
        risk_score = float(pred * 100)

    return {
        "prediction": int(pred),
        "risk_score": round(risk_score, 2)
    }