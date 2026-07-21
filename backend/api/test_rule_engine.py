from rule_based_model import evaluate_vehicle

data = {
    "Vehicle_Model": "Car",
    "Maintenance_History": "Good",
    "Reported_Issues": 1,
    "Vehicle_Age": 2,
    "Odometer_Reading": 12000,
    "Days_Since_Last_Service": 90,
    "Accident_History": 0,
    "Fuel_Efficiency": 20,
    "Tire_Condition": "New",
    "Brake_Condition": "New",
    "Battery_Status": "New"
}

print(evaluate_vehicle(data))