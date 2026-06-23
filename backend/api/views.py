from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ml_model import predict

@api_view(['POST'])
def predict_view(request):
    data = request.data

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

    return Response({"Need_Maintenance": int(result)})