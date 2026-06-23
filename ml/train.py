import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv("vehicle_maintenance_data.csv")

# Drop date column if exists
if "Last_Service_Date" in df.columns:
    df.drop("Last_Service_Date", axis=1, inplace=True)

# Encode categorical columns
categorical_cols = df.select_dtypes(include=["object"]).columns

le_dict = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    le_dict[col] = le

# Split features and target
X = df.drop("Need_Maintenance", axis=1)
y = df["Need_Maintenance"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Accuracy
print("Accuracy:", accuracy_score(y_test, y_pred))

# Save model + encoders
joblib.dump(model, "model.pkl")
joblib.dump(le_dict, "encoders.pkl")

print("Model saved successfully!")