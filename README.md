# 🚗 AutoCare AI - Vehicle Maintenance Predictor

## 📌 Overview

AutoCare AI is a machine learning-based vehicle maintenance prediction system that predicts whether a vehicle requires maintenance based on its condition and usage history.

The system also generates:

* Maintenance Risk Score (0–100%)
* Fault Detection Reports
* Vehicle Health Analysis

Built using:

* React + Vite (Frontend)
* Django REST Framework (Backend)
* Random Forest Classifier (Machine Learning)

---

## 🚀 Features

### Machine Learning

* Random Forest maintenance prediction
* Risk score generation
* Automatic fault detection
* Multiple vehicle types supported

### Backend

* Django REST API
* Input validation
* CORS support
* Encoder-based categorical processing

### Frontend

* Modern React UI
* Interactive dashboard
* Real-time predictions
* Vehicle health visualization

---

## 📂 Project Structure

```text
vehicle-maintenance-predictor/

├── backend/
│   ├── api/
│   ├── backend/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── ml/
│   ├── train.py
│   ├── model.pkl
│   ├── encoders.pkl
│   └── vehicle_maintenance_data.csv
│
└── README.md
```

---

## 📊 Dataset Features

The model uses:

* Vehicle Model
* Maintenance History
* Reported Issues
* Vehicle Age
* Odometer Reading
* Days Since Last Service
* Service History Score
* Accident History
* Fuel Efficiency
* Tire Condition
* Brake Condition
* Battery Status

---

## 🔧 Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py runserver
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🎯 Sample API Request

```json
{
    "Vehicle_Model": "Car",
    "Maintenance_History": "Good",
    "Reported_Issues": 1,
    "Vehicle_Age": 4,
    "Odometer_Reading": 64250,
    "Days_Since_Last_Service": 92,
    "Service_History": 8,
    "Accident_History": 0,
    "Fuel_Efficiency": 18.5,
    "Tire_Condition": "Good",
    "Brake_Condition": "Good",
    "Battery_Status": "Good"
}
```

---

## 🎯 Sample API Response

```json
{
    "Need_Maintenance": 0,
    "Risk_Score": 18.4,
    "Faults_Detected": [
        "No Major Faults Detected"
    ]
}
```

---

## 🔮 Future Improvements

* Deep Learning models
* Real-time IoT sensor integration
* Cloud deployment
* Maintenance scheduling system
* User authentication
* Vehicle service history database

---

## 👥 Team Project

Developed as a collaborative Machine Learning and Full Stack project.
