from rest_framework.decorators import api_view
from rest_framework.response import Response

from .ml_model import predict
from .diagnosis import detect_faults

import joblib
import os
from django.conf import settings


# =========================
# LOAD ENCODERS
# =========================

BASE_DIR = settings.BASE_DIR

encoders_path = os.path.join(BASE_DIR, "..", "ml", "encoders.pkl")

encoders = joblib.load(encoders_path)


@api_view(["POST"])
def predict_view(request):

    data = request.data

    vehicle_model = encoders["Vehicle_Model"].transform(
        [data["Vehicle_Model"]]
    )[0]

    maintenance_history = encoders["Maintenance_History"].transform(
        [data["Maintenance_History"]]
    )[0]

    tire_condition = encoders["Tire_Condition"].transform(
        [data["Tire_Condition"]]
    )[0]

    brake_condition = encoders["Brake_Condition"].transform(
        [data["Brake_Condition"]]
    )[0]

    battery_status = encoders["Battery_Status"].transform(
        [data["Battery_Status"]]
    )[0]

    features = [
        vehicle_model,
        maintenance_history,
        int(data["Reported_Issues"]),
        int(data["Vehicle_Age"]),
        float(data["Odometer_Reading"]),
        int(data["Days_Since_Last_Service"]),
        int(data["Accident_History"]),
        float(data["Fuel_Efficiency"]),
        tire_condition,
        brake_condition,
        battery_status
    ]

    result = predict(features)
    faults = detect_faults(features)

    risk_score = result["risk_score"]

    if risk_score < 20:
        status = "Vehicle Healthy"
        recommendation = (
            "No immediate maintenance required. Continue regular servicing."
        )

    elif risk_score < 40:
        status = "Monitor Vehicle"
        recommendation = (
            "Routine inspection is recommended during the next service cycle."
        )

    elif risk_score < 60:
        status = "Suggested Maintenance"
        recommendation = (
            "Some components should be checked soon to prevent future issues."
        )

    elif risk_score < 80:
        status = "Maintenance Required"
        recommendation = (
            "Vehicle servicing is recommended within the next few days."
        )

    else:
        status = "Immediate Maintenance"
        recommendation = (
            "Urgent maintenance is required. Avoid long trips until the vehicle is inspected."
        )


    return Response({
        "Need_Maintenance": result["prediction"],
        "Risk_Score": risk_score,
        "Maintenance_Status": status,
        "Recommendation": recommendation,
        "Faults_Detected": faults
    })