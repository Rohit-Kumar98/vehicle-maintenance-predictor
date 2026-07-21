import { useState } from "react";
import axios from "axios";

import Form from "./components/Form";
import ResultCard from "./components/ResultCard";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const predictVehicle = async (vehicleData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict/",
        vehicleData
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
          "Unable to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <div className="bg-slate-900 border-b border-cyan-500/20">

        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-cyan-400">
              Vehicle Maintenance Predictor
            </h1>

            <p className="text-slate-400 mt-1">
              Rule-Based Expert System
            </p>

          </div>

        </div>

      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid lg:grid-cols-2 gap-8">

          <Form
            onPredict={predictVehicle}
            loading={loading}
          />

          <ResultCard
            loading={loading}
            result={result}
          />

        </div>

      </div>

    </div>
  );
}