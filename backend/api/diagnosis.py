"""
Vehicle Diagnosis Module

This module analyzes vehicle inputs and identifies:
1. Faults
2. Severity
3. Recommendation
4. Maintenance Checklist
"""

from typing import Dict


def detect_faults(data: Dict):

    faults = []

    checklist = []

    age = int(data["Vehicle_Age"])
    km = float(data["Odometer_Reading"])
    service_days = int(data["Days_Since_Last_Service"])
    issues = int(data["Reported_Issues"])
    accidents = int(data["Accident_History"])

    maintenance = data["Maintenance_History"]
    tire = data["Tire_Condition"]
    brake = data["Brake_Condition"]
    battery = data["Battery_Status"]



    if service_days >= 365:

        faults.append({
            "Fault": "Service Overdue",
            "Severity": "High",
            "Recommendation": "Schedule complete vehicle servicing immediately."
        })

        checklist.append("Complete Vehicle Service")


    elif service_days >= 180:

        faults.append({
            "Fault": "Service Due Soon",
            "Severity": "Medium",
            "Recommendation": "Book a routine service appointment."
        })

        checklist.append("Routine Service")



    if battery == "Weak":

        severity = "Medium"

        if age >= 8:
            severity = "High"

        faults.append({
            "Fault": "Weak Battery",
            "Severity": severity,
            "Recommendation": "Inspect battery health and replace if required."
        })

        checklist.append("Battery Check")



    if brake == "Worn Out":

        faults.append({
            "Fault": "Brake Wear",
            "Severity": "High",
            "Recommendation": "Replace brake pads and inspect braking system."
        })

        checklist.append("Brake Inspection")


    elif brake == "Good":

        checklist.append("Brake Inspection")



    if tire == "Worn Out":

        faults.append({
            "Fault": "Worn Tyres",
            "Severity": "High",
            "Recommendation": "Replace tyres and perform wheel alignment."
        })

        checklist.append("Tyre Replacement")


    elif tire == "Good":

        checklist.append("Tyre Pressure Check")



    if km >= 200000:

        faults.append({
            "Fault": "High Mileage Wear",
            "Severity": "High",
            "Recommendation": "Inspect engine, suspension and transmission."
        })

        checklist.append("Engine Inspection")


    elif km >= 100000:

        faults.append({
            "Fault": "Mileage Wear",
            "Severity": "Medium",
            "Recommendation": "Inspect engine components."
        })

        checklist.append("Engine Inspection")



    if maintenance == "Poor":

        faults.append({
            "Fault": "Poor Maintenance History",
            "Severity": "Medium",
            "Recommendation": "Follow manufacturer maintenance schedule."
        })

        checklist.append("General Inspection")



    if accidents >= 3:

        faults.append({
            "Fault": "Frequent Accident History",
            "Severity": "High",
            "Recommendation": "Inspect chassis, suspension and steering."
        })

        checklist.append("Suspension Inspection")


    elif accidents >= 1:

        checklist.append("Wheel Alignment")



    if issues >= 5:

        faults.append({
            "Fault": "Multiple Reported Issues",
            "Severity": "High",
            "Recommendation": "Perform full vehicle diagnostics."
        })

        checklist.append("Full Diagnostics")


    elif issues >= 2:

        checklist.append("General Diagnostics")



    if age >= 10:

        checklist.append("Suspension Check")
        checklist.append("Coolant Replacement")

    if age >= 15:

        faults.append({
            "Fault": "Old Vehicle",
            "Severity": "Medium",
            "Recommendation": "Perform complete mechanical inspection."
        })



    if len(faults) == 0:

        faults.append({
            "Fault": "No Major Faults Detected",
            "Severity": "Low",
            "Recommendation": "Continue periodic maintenance."
        })


    checklist = list(dict.fromkeys(checklist))


    return {

        "faults": faults,

        "checklist": checklist

    }