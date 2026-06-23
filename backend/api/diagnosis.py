def detect_faults(data):

    faults = []

    if data[9] >= 2:
        faults.append("Worn Tires")

    if data[10] >= 2:
        faults.append("Brake Degradation")

    if data[11] >= 2:
        faults.append("Weak Battery")

    if data[5] > 300:
        faults.append("Service Overdue")

    if data[4] > 100000:
        faults.append("High Mileage Wear")

    return faults