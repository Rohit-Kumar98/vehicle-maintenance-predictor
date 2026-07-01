def detect_faults(data):

    faults = []

    # New indices (11 features)
    # 0 Vehicle_Model
    # 1 Maintenance_History
    # 2 Reported_Issues
    # 3 Vehicle_Age
    # 4 Odometer_Reading
    # 5 Days_Since_Last_Service
    # 6 Accident_History
    # 7 Fuel_Efficiency
    # 8 Tire_Condition
    # 9 Brake_Condition
    # 10 Battery_Status

    if data[8] == 2:
        faults.append("Worn Tires")

    if data[9] == 2:
        faults.append("Brake Degradation")

    if data[10] == 2:
        faults.append("Weak Battery")

    if data[5] > 500:
        faults.append("Critical Service Overdue")
    elif data[5] > 300:
        faults.append("Service Overdue")

    if data[4] > 200000:
        faults.append("Engine Overhaul Recommended")
    elif data[4] > 100000:
        faults.append("High Mileage Wear")

    if data[7] < 8:
        faults.append("Critical Fuel Inefficiency")
    elif data[7] < 12:
        faults.append("Poor Fuel Efficiency")

    if data[3] > 15:
        faults.append("Vehicle Near End of Life")
    elif data[3] > 10:
        faults.append("Aging Vehicle")

    if data[2] >= 4:
        faults.append("Multiple Mechanical Issues Reported")

    if data[6] >= 2:
        faults.append("Frequent Accident History")

    if not faults:
        faults.append("No Major Faults Detected")

    return faults