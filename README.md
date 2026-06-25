# 🚗 Vehicle Maintenance Predictor (AI + Full Stack Project)

## 📌 Overview

The **Vehicle Maintenance Predictor** is an AI-powered full-stack system that predicts whether a vehicle requires maintenance based on its condition, usage history, and performance indicators.

It also provides:
- ⚠️ Risk Score (0–100%)
- 🔧 Fault Detection (Explainable AI layer)
- 📊 Maintenance Prediction (Yes/No)

This project combines **Machine Learning + Django REST API + Rule-based diagnostics** to simulate a real-world predictive maintenance system.

---

# 🎯 Features

## 🤖 Machine Learning
- Trained classification model
- Predicts maintenance requirement
- Outputs probability-based risk score

## ⚠️ Risk Analysis
- Risk Score (0–100%)
- Risk Levels:
  - Safe (0–30%)
  - Warning (30–70%)
  - Critical (70–100%)

## 🔧 Fault Detection Engine
Detects possible issues like:
- Worn Tires
- Brake Degradation
- Weak Battery
- Service Overdue
- High Mileage Wear

## 🌐 REST API
- Django REST Framework backend
- `/api/predict/` endpoint for predictions

---

# 🏗️ Project Architecture

Frontend
        ↓
Django REST API
        ↓
ML Model (Scikit-learn)
        ↓
Prediction + Risk Score
        ↓
Rule-based Fault Detection Engine

---

# 🧠 Tech Stack

## Backend
- Python
- Django
- Django REST Framework

## Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib

## Tools
- Git & GitHub
- VS Code

---

# 📊 API Endpoint

## 🔹 Predict Maintenance

**POST**