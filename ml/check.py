import pandas as pd

df = pd.read_csv(r"C:\Users\ROHIT\Downloads\vehicle_maintenance_data - Copy.csv")

print("Class counts:")
print(df["Need_Maintenance"].value_counts())

print("\nPercentages:")
print(df["Need_Maintenance"].value_counts(normalize=True) * 100)