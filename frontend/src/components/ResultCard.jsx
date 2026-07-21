import Gauge from "./Gauge";
import FaultCard from "./FaultCard";
import {
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  Wrench,
  ShieldCheck,
} from "lucide-react";

export default function ResultCard({ result, loading }) {
  if (loading) {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-700 p-8 flex justify-center items-center min-h-[650px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h2 className="text-2xl font-bold">
            Analyzing Vehicle...
          </h2>

          <p className="text-slate-400 mt-2">
            Running Expert System
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-700 p-8 flex justify-center items-center min-h-[650px]">

        <div className="text-center">

          <ShieldCheck
            size={80}
            className="mx-auto text-cyan-400 mb-6"
          />

          <h2 className="text-3xl font-bold">
            Prediction Result
          </h2>

          <p className="text-slate-400 mt-3">
            Fill the form and press
            <br />
            Predict Maintenance
          </p>

        </div>

      </div>
    );
  }

  const riskColor = () => {
    const score = result.Risk_Score;

    if (score <= 20) return "bg-green-500";

    if (score <= 40) return "bg-yellow-500";

    if (score <= 60) return "bg-orange-500";

    return "bg-red-500";
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 space-y-8">

      {/* Gauge */}

      <Gauge score={result.Risk_Score} />

      {/* Risk Level */}

      <div className="text-center">

        <span
          className={`inline-block px-5 py-2 rounded-full text-white font-bold ${riskColor()}`}
        >
          {result.Risk_Level}
        </span>

      </div>

      {/* Status */}

      <div className="rounded-xl bg-slate-800 p-5">

        <h3 className="text-lg font-semibold mb-2">
          Maintenance Status
        </h3>

        <p className="text-cyan-400 font-bold text-xl">
          {result.Maintenance_Status}
        </p>

      </div>

      {/* Recommendation */}

      <div className="rounded-xl bg-slate-800 p-5">

        <div className="flex items-center gap-2 mb-3">

          <Wrench className="text-cyan-400" />

          <h3 className="font-semibold">
            Recommendation
          </h3>

        </div>

        <p className="text-slate-300">
          {result.Recommendation}
        </p>

      </div>

      {/* Reasons */}

      <div className="rounded-xl bg-slate-800 p-5">

        <div className="flex items-center gap-2 mb-4">

          <AlertTriangle className="text-yellow-400" />

          <h3 className="font-semibold">
            Risk Factors
          </h3>

        </div>

        <ul className="space-y-3">

          {result.Reasons.map((reason, index) => (

            <li
              key={index}
              className="flex gap-3 items-start"
            >

              <CheckCircle2
                size={18}
                className="text-green-400 mt-1"
              />

              <span>{reason}</span>

            </li>

          ))}

        </ul>

      </div>

      {/* Faults */}

      <div>

        <h2 className="text-xl font-bold mb-4">
          Detected Faults
        </h2>

        <div className="space-y-4">

          {result.Faults_Detected.map((fault, index) => (

            <FaultCard
              key={index}
              fault={fault}
            />

          ))}

        </div>

      </div>

      {/* Checklist */}

      <div className="rounded-xl bg-slate-800 p-5">

        <div className="flex items-center gap-2 mb-4">

          <ClipboardList className="text-cyan-400" />

          <h3 className="font-semibold">
            Maintenance Checklist
          </h3>

        </div>

        <div className="grid gap-3">

          {result.Maintenance_Checklist.map(
            (item, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <input
                  type="checkbox"
                  className="w-5 h-5 accent-cyan-500"
                />

                <span>{item}</span>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}