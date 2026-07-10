# 🚗 AutoCare AI - Vehicle Maintenance Predictor

## 📌 Overview

AutoCare AI is a machine learning-based vehicle maintenance prediction system that predicts whether a vehicle requires maintenance based on vehicle condition, usage patterns, and maintenance history.

The system provides:

* Maintenance Prediction (Yes/No)
* Risk Score (0–100%)
* Fault Detection and Diagnosis
* Vehicle Health Analysis

The project is built using:

* **React + Vite** (Frontend)
* **Django REST Framework** (Backend)
* **Custom Logistic Regression implemented from scratch using NumPy** (Machine Learning)

---

## 🚀 Features

### Machine Learning

* Custom Binary Logistic Regression implementation
* Gradient Descent optimization
* Binary Cross-Entropy loss function
* Feature normalization using standard scaling
* Probability-based risk score generation
* Model accuracy: **87.54%**

### Backend

* Django REST API
* Input validation
* CORS support
* Encoder-based categorical processing
* Automatic fault detection

### Frontend

* Modern React interface
* Interactive prediction dashboard
* Real-time API communication
* User-friendly vehicle maintenance analysis

---

## 🧠 Machine Learning Implementation

Instead of using pre-built classifiers such as Random Forest, this project implements **Binary Logistic Regression from scratch using NumPy**.

The implementation includes:

* Sigmoid Activation Function
* Gradient Descent Optimization
* Binary Cross-Entropy Loss
* Feature Scaling
* Probability-Based Predictions

### Sigmoid Function

```math
σ(z) = 1 / (1 + e^(-z))
```

### Gradient Descent Update Rule

```math
w = w - α × gradient
```

---

## 📂 Project Structure

```text
vehicle-maintenance-predictor/

├── backend/
│   ├── api/
│   │   ├── views.py
│   │   ├── ml_model.py
│   │   ├── diagnosis.py
│   │   └── urls.py
│   │
│   ├── backend/
│   ├── logistic_regression.py
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
│   ├── scaler.pkl
│   ├── encoders.pkl
│   └── vehicle_maintenance_data.csv
│
├── .gitignore
└── README.md
```

---

## 📊 Dataset Features

The model uses the following input features:

* Vehicle Model
* Maintenance History
* Reported Issues
* Vehicle Age
* Odometer Reading
* Days Since Last Service
* Accident History
* Fuel Efficiency
* Tire Condition
* Brake Condition
* Battery Status

### Target Variable

* Need Maintenance (0 or 1)

---

## 🔧 Installation

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py runserver
```

---

### Frontend Setup

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

## 🔍 Fault Detection Rules

The system automatically identifies:

* Worn Tires
* Brake Degradation
* Weak Battery
* Service Overdue
* Critical Service Overdue
* High Mileage Wear
* Engine Overhaul Recommendation
* Poor Fuel Efficiency
* Critical Fuel Inefficiency
* Aging Vehicle
* Vehicle Near End of Life
* Multiple Mechanical Issues
* Frequent Accident History

---

## 📈 Model Performance

| Metric          | Value                      |
| --------------- | -------------------------- |
| Algorithm       | Custom Logistic Regression |
| Accuracy        | 83.06%                     |
| Optimization    | Gradient Descent           |
| Loss Function   | Binary Cross-Entropy       |
| Feature Scaling | Standard Normalization     |

---

## 🔮 Future Improvements

* Deep Learning models
* Real-time IoT sensor integration
* Cloud deployment
* Vehicle maintenance scheduling
* User authentication system
* Vehicle service history database
* Mobile application support

---

## 👥 Team Project

Developed as a collaborative Full Stack and Machine Learning project.

### Technologies Used

* Python
* NumPy
* Pandas
* Django
* Django REST Framework
* React
* Vite
* JavaScript
* HTML
* CSS

---

## 📜 License

This project is intended for educational and internship purposes.
