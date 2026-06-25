import joblib

# Load all saved encoders
encoders = joblib.load("encoders.pkl")

print("=" * 50)
print("ENCODER MAPPINGS")
print("=" * 50)

for column_name, encoder in encoders.items():

    print(f"\n{column_name}:")

    for index, value in enumerate(encoder.classes_):
        print(f"  {index} -> {value}")

print("\n" + "=" * 50)