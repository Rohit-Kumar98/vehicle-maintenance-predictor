from rest_framework.decorators import api_view
from rest_framework.response import Response

from .rule_based_model import evaluate_vehicle
from .diagnosis import detect_faults


@api_view(["POST"])
def predict_view(request):

    try:

        data = request.data


        result = evaluate_vehicle(data)


        diagnosis = detect_faults(data)


        score = result["risk_score"]

        if score <= 20:
            risk_level = "Low"
        elif score <= 40:
            risk_level = "Moderate"
        elif score <= 60:
            risk_level = "Elevated"
        elif score <= 80:
            risk_level = "High"
        else:
            risk_level = "Critical"


        return Response({

            "Need_Maintenance": result["prediction"],

            "Risk_Score": result["risk_score"],

            "Risk_Level": risk_level,

            "Risk_Score": result["risk_score"],

            "Confidence": result["confidence"],

            "Maintenance_Status": result["status"],

            "Recommendation": result["recommendation"],

            "Reasons": result["reasons"],

            "Faults_Detected": diagnosis["faults"],

            "Maintenance_Checklist": diagnosis["checklist"]

        })

    except Exception as e:

        return Response({

            "error": str(e)

        }, status=400)