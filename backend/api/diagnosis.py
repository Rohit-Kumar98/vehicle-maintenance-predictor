def detect_faults(data):
    faults = []

    # data indices
    # 0 Vehicle_Model
    # 1 Maintenance_History
    # 2 Reported_Issues
    # 3 Vehicle_Age
    # 4 Odometer_Reading
    # 5 Days_Since_Last_Service
    # 6 Service_History
    # 7 Accident_History
    # 8 Fuel_Efficiency
    # 9 Tire_Condition
    # 10 Brake_Condition
    # 11 Battery_Status

    # Tires
    if data[9] == 2:
        faults.append("Worn Tires")

    # Brakes
    if data[10] == 2:
        faults.append("Brake Degradation")

    # Battery
    if data[11] == 2:
        faults.append("Weak Battery")

    # Service overdue
    if data[5] > 500:
        faults.append("Critical Service Overdue")
    elif data[5] > 300:
        faults.append("Service Overdue")

    # Odometer
    if data[4] > 200000:
        faults.append("Engine Overhaul Recommended")
    elif data[4] > 100000:
        faults.append("High Mileage Wear")

    # Fuel efficiency
    if data[8] < 8:
        faults.append("Critical Fuel Inefficiency")
    elif data[8] < 12:
        faults.append("Poor Fuel Efficiency")

    # Vehicle age
    if data[3] > 15:
        faults.append("Vehicle Near End of Life")
    elif data[3] > 10:
        faults.append("Aging Vehicle")

    # Reported issues
    if data[2] >= 4:
        faults.append("Multiple Mechanical Issues Reported")

    # Accident history
    if data[7] >= 2:
        faults.append("Frequent Accident History")

    if not faults:
        faults.append("No Major Faults Detected")

    return faults