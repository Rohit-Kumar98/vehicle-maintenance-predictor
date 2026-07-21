"""
Rule Based Vehicle Maintenance Expert System

This module calculates:
1. Risk Score (0-100)
2. Maintenance Prediction
3. Maintenance Status
4. Recommendation
5. Reasons behind prediction

No Machine Learning is used.
"""

from typing import Dict, List


# ==========================================================
# Vehicle Specific Thresholds
# ==========================================================

VEHICLE_LIMITS = {

    "Car": {
        "high_km": 100000,
        "critical_km": 200000,
        "good_fe": 18,
        "poor_fe": 12
    },

    "SUV": {
        "high_km": 120000,
        "critical_km": 220000,
        "good_fe": 15,
        "poor_fe": 10
    },

    "Truck": {
        "high_km": 180000,
        "critical_km": 300000,
        "good_fe": 8,
        "poor_fe": 6
    },

    "Bus": {
        "high_km": 200000,
        "critical_km": 350000,
        "good_fe": 7,
        "poor_fe": 5
    },

    "Motorcycle": {
        "high_km": 50000,
        "critical_km": 100000,
        "good_fe": 40,
        "poor_fe": 25
    },

    "Van": {
        "high_km": 120000,
        "critical_km": 250000,
        "good_fe": 12,
        "poor_fe": 8
    }

}


# ==========================================================
# Helper Functions
# ==========================================================

def add_reason(reasons: List[str], message: str):
    """Avoid duplicate reasons"""
    if message not in reasons:
        reasons.append(message)


def clamp(score: int):

    if score < 0:
        return 0

    if score > 100:
        return 100

    return score



def evaluate_vehicle(data: Dict):

    score = 0

    reasons = []


    vehicle = data["Vehicle_Model"]

    maintenance = data["Maintenance_History"]

    issues = int(data["Reported_Issues"])

    age = int(data["Vehicle_Age"])

    km = float(data["Odometer_Reading"])

    service_days = int(data["Days_Since_Last_Service"])

    accidents = int(data["Accident_History"])

    fuel = float(data["Fuel_Efficiency"])

    tire = data["Tire_Condition"]

    brake = data["Brake_Condition"]

    battery = data["Battery_Status"]

    limits = VEHICLE_LIMITS[vehicle]



    if age >= 15:

        score += 20
        add_reason(reasons, "Vehicle is older than 15 years")

    elif age >= 10:

        score += 15
        add_reason(reasons, "Vehicle is over 10 years old")

    elif age >= 5:

        score += 8



    if km >= limits["critical_km"]:

        score += 20
        add_reason(reasons, "Extremely high mileage")

    elif km >= limits["high_km"]:

        score += 12
        add_reason(reasons, "High vehicle mileage")

    elif km >= limits["high_km"] * 0.5:

        score += 6



    if maintenance == "Poor":

        score += 20
        add_reason(reasons, "Poor maintenance history")

    elif maintenance == "Average":

        score += 10
        add_reason(reasons, "Average maintenance history")



    if service_days >= 365:

        score += 15
        add_reason(reasons, "Service overdue")

    elif service_days >= 180:

        score += 8



    if issues == 0:

        pass

    elif issues <= 2:

        score += 5

    elif issues <= 5:

        score += 12
        add_reason(reasons, "Multiple reported issues")

    else:

        score += 20
        add_reason(reasons, "Numerous reported issues")



    if accidents == 0:

        pass

    elif accidents == 1:

        score += 5

    elif accidents <= 3:

        score += 12
        add_reason(reasons, "Multiple accident records")

    else:

        score += 20
        add_reason(reasons, "Vehicle has significant accident history")


    if fuel < limits["poor_fe"]:

        score += 10
        add_reason(reasons, "Poor fuel efficiency")

    elif fuel < limits["good_fe"]:

        score += 5




    if tire == "Worn Out":

        score += 10
        add_reason(reasons, "Worn tyres")

    elif tire == "Good":

        score += 3


    if brake == "Worn Out":

        score += 10
        add_reason(reasons, "Brake wear detected")

    elif brake == "Good":

        score += 3



    if battery == "Weak":

        score += 8
        add_reason(reasons, "Weak battery")

    elif battery == "Good":

        score += 2



    # Old vehicle + weak battery
    if age >= 8 and battery == "Weak":

        score += 5
        add_reason(reasons, "Old vehicle with weak battery")



    # High mileage + poor maintenance
    if km >= limits["high_km"] and maintenance == "Poor":

        score += 8
        add_reason(reasons, "High mileage with poor maintenance history")



    # Old vehicle + worn tyres
    if age >= 10 and tire == "Worn Out":

        score += 5
        add_reason(reasons, "Old vehicle with worn tyres")



    # Old vehicle + worn brakes
    if age >= 10 and brake == "Worn Out":

        score += 5
        add_reason(reasons, "Old vehicle with worn brakes")



    # Many issues + accident history
    if issues >= 5 and accidents >= 2:

        score += 8
        add_reason(reasons, "Multiple issues after repeated accidents")



    # Service overdue + poor maintenance
    if service_days >= 365 and maintenance == "Poor":

        score += 6
        add_reason(reasons, "Poor maintenance with overdue servicing")


    if age < 3 and maintenance == "Good":

        score -= 5



    if service_days < 60:

        score -= 3



    if tire == "New":

        score -= 2



    if brake == "New":

        score -= 2



    if battery == "New":

        score -= 2



    if issues == 0:

        score -= 2



    if accidents == 0:

        score -= 2



    score = clamp(score)




    if score <= 20:

        prediction = 0

        status = "Vehicle Healthy"

        recommendation = (
            "No immediate maintenance required. Continue regular servicing."
        )



    elif score <= 40:

        prediction = 0

        status = "Monitor Vehicle"

        recommendation = (
            "Routine inspection is recommended during the next service cycle."
        )



    elif score <= 60:

        prediction = 0

        status = "Suggested Maintenance"

        recommendation = (
            "Some components should be checked soon to prevent future issues."
        )



    elif score <= 80:

        prediction = 1

        status = "Maintenance Required"

        recommendation = (
            "Vehicle servicing is recommended within the next few days."
        )



    else:

        prediction = 1

        status = "Immediate Maintenance"

        recommendation = (
            "Urgent maintenance is required. Avoid driving until the vehicle is inspected."
        )




    if score >= 80:

        confidence = "Very High"

    elif score >= 60:

        confidence = "High"

    elif score >= 40:

        confidence = "Medium"

    else:

        confidence = "Low"



    return {

        "prediction": prediction,

        "risk_score": score,

        "status": status,

        "recommendation": recommendation,

        "confidence": confidence,

        "reasons": reasons

    }