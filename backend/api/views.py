from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ml_model import predict
from .diagnosis import detect_faults
import joblib
import os
from django.conf import settings


# Load encoders once when Django starts
BASE_DIR = settings.BASE_DIR
encoder_path = os.path.join(BASE_DIR, "..", "ml", "encoders.pkl")
encoders = joblib.load(encoder_path)


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
        data["Service_History"] = int(data["Service_History"])
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
                {"error": "Days since service cannot be negative"},
                status=400
            )


        features = [
            data["Vehicle_Model"],
            data["Maintenance_History"],
            data["Reported_Issues"],
            data["Vehicle_Age"],
            data["Odometer_Reading"],
            data["Days_Since_Last_Service"],
            data["Service_History"],
            data["Accident_History"],
            data["Fuel_Efficiency"],
            data["Tire_Condition"],
            data["Brake_Condition"],
            data["Battery_Status"]
        ]

        result = predict(features)
        faults = detect_faults(features)

        return Response({
            "Need_Maintenance": result["prediction"],
            "Risk_Score": result["risk_score"],
            "Faults_Detected": faults
        })

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=500
        )