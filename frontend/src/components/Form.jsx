import { useState } from "react";
import { Car, Cpu, Loader2 } from "lucide-react";

export default function Form({ onPredict, loading }) {
  const [form, setForm] = useState({
    Vehicle_Model: "Car",
    Maintenance_History: "Good",
    Reported_Issues: 0,
    Vehicle_Age: 1,
    Odometer_Reading: 10000,
    Days_Since_Last_Service: 30,
    Accident_History: 0,
    Fuel_Efficiency: 20,
    Tire_Condition: "New",
    Brake_Condition: "New",
    Battery_Status: "New",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        e.target.type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(form);
  };

  const Input = ({
    label,
    name,
    type = "text",
    min = 0,
  }) => (
    <div>
      <label className="block mb-2 text-sm text-slate-300 font-medium">
        {label}
      </label>

      <input
        type={type}
        min={min}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 outline-none focus:border-cyan-400"
      />
    </div>
  );

  const Select = ({ label, name, options }) => (
    <div>
      <label className="block mb-2 text-sm text-slate-300 font-medium">
        {label}
      </label>

      <select
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 outline-none focus:border-cyan-400"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-xl p-6">

      <div className="flex items-center gap-3 mb-6">

        <Car className="text-cyan-400" size={30} />

        <div>

          <h2 className="text-2xl font-bold">
            Vehicle Details
          </h2>

          <p className="text-slate-400 text-sm">
            Fill in all vehicle information
          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <Select
          label="Vehicle Model"
          name="Vehicle_Model"
          options={[
            "Car",
            "SUV",
            "Truck",
            "Bus",
            "Motorcycle",
            "Van",
          ]}
        />

        <Select
          label="Maintenance History"
          name="Maintenance_History"
          options={[
            "Good",
            "Average",
            "Poor",
          ]}
        />

        <Input
          label="Vehicle Age"
          name="Vehicle_Age"
          type="number"
        />

        <Input
          label="Odometer Reading"
          name="Odometer_Reading"
          type="number"
        />

        <Input
          label="Reported Issues"
          name="Reported_Issues"
          type="number"
        />

        <Input
          label="Days Since Last Service"
          name="Days_Since_Last_Service"
          type="number"
        />

        <Input
          label="Accident History"
          name="Accident_History"
          type="number"
        />

        <Input
          label="Fuel Efficiency"
          name="Fuel_Efficiency"
          type="number"
        />

        <Select
          label="Tire Condition"
          name="Tire_Condition"
          options={[
            "New",
            "Good",
            "Worn Out",
          ]}
        />

        <Select
          label="Brake Condition"
          name="Brake_Condition"
          options={[
            "New",
            "Good",
            "Worn Out",
          ]}
        />

        <Select
          label="Battery Status"
          name="Battery_Status"
          options={[
            "New",
            "Good",
            "Weak",
          ]}
        />

        <div className="md:col-span-2 mt-3">

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition rounded-xl py-4 font-bold text-black flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />
                Predicting...
              </>
            ) : (
              <>
                <Cpu size={20} />
                Predict Maintenance
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
}