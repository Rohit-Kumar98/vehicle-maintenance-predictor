from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ml_model import predict
from .diagnosis import detect_faults

import joblib
import os
from django.conf import settings


BASE_DIR = settings.BASE_DIR
encoder_path = os.path.join(BASE_DIR, "..", "ml", "encoders.pkl")
encoders = joblib.load(encoder_path)


def get_maintenance_summary(need_maintenance, risk_score):
    if need_maintenance or risk_score >= 70:
        return {
            "status": "Maintenance Required",
            "recommendation": "Immediate service is recommended to prevent vehicle failure."
        }

    if risk_score >= 40:
        return {
            "status": "Service Soon",
            "recommendation": "Schedule a service visit soon and inspect flagged components."
        }

    if risk_score >= 20:
        return {
            "status": "Monitor Vehicle",
            "recommendation": "Routine inspection is recommended during the next service cycle."
        }

    return {
        "status": "Healthy Vehicle",
        "recommendation": "Continue regular maintenance and monitor normal service intervals."
    }


@api_view(['POST'])
def predict_view(request):

    try:

        data = request.data.copy()

        categorical_fields = [
            "Vehicle_Model",
            "Maintenance_History",
            "Tire_Condition",
            "Brake_Condition",
            "Battery_Status"
        ]

        for field in categorical_fields:
            if isinstance(data[field], str):
                data[field] = int(
                    encoders[field].transform([data[field]])[0]
                )

        data["Reported_Issues"] = int(data["Reported_Issues"])
        data["Vehicle_Age"] = int(data["Vehicle_Age"])
        data["Odometer_Reading"] = float(data["Odometer_Reading"])
        data["Days_Since_Last_Service"] = float(data["Days_Since_Last_Service"])
        data["Service_History"] = int(data.get("Service_History") or 5)
        data["Accident_History"] = int(data["Accident_History"])
        data["Fuel_Efficiency"] = float(data["Fuel_Efficiency"])


        if data["Vehicle_Age"] < 0:
            return Response(
                {"error": "Vehicle age cannot be negative"},
                status=400
            )

        if data["Odometer_Reading"] < 0:
            return Response(
                {"error": "Invalid odometer reading"},
                status=400
            )

        if data["Fuel_Efficiency"] <= 0:
            return Response(
                {"error": "Fuel efficiency must be greater than 0"},
                status=400
            )

        if data["Days_Since_Last_Service"] < 0:
            return Response(
                {"error": "Days since last service cannot be negative"},
                status=400
            )


        features = [
            data["Vehicle_Model"],
            data["Maintenance_History"],
            data["Reported_Issues"],
            data["Vehicle_Age"],
            data["Odometer_Reading"],
            data["Days_Since_Last_Service"],
            data["Accident_History"],
            data["Fuel_Efficiency"],
            data["Tire_Condition"],
            data["Brake_Condition"],
            data["Battery_Status"]
        ]

        result = predict(features)

        faults = detect_faults(features)
        summary = get_maintenance_summary(
            result["prediction"],
            result["risk_score"]
        )

        return Response({
            "Need_Maintenance": result["prediction"],
            "Risk_Score": result["risk_score"],
            "Maintenance_Status": summary["status"],
            "Recommendation": summary["recommendation"],
            "Faults_Detected": faults
        })

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=500
        )
