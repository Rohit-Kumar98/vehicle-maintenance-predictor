import joblib
import numpy as np
import os
from django.conf import settings

BASE_DIR = settings.BASE_DIR

model_path = os.path.join(BASE_DIR, "..", "ml", "model.pkl")

model = joblib.load(model_path)

def predict(data):
    data = np.array(data).reshape(1, -1)
    return model.predict(data)[0]