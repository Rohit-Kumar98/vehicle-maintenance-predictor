import { AlertTriangle, Wrench, ShieldAlert } from "lucide-react";

export default function FaultCard({ fault }) {
  const getColor = (severity) => {
    switch (severity) {
      case "High":
        return {
          bg: "bg-red-500/15",
          border: "border-red-500",
          text: "text-red-400",
        };

      case "Medium":
        return {
          bg: "bg-yellow-500/15",
          border: "border-yellow-500",
          text: "text-yellow-400",
        };

      default:
        return {
          bg: "bg-green-500/15",
          border: "border-green-500",
          text: "text-green-400",
        };
    }
  };

  const color = getColor(fault.Severity);

  return (
    <div
      className={`rounded-xl border ${color.border} ${color.bg} p-4 shadow-lg`}
    >
      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-2">

            <AlertTriangle
              className={color.text}
              size={20}
            />

            <h3 className="text-lg font-semibold">
              {fault.Fault}
            </h3>

          </div>

          <div
            className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-sm font-semibold ${color.bg} ${color.text}`}
          >
            <ShieldAlert size={15} />
            {fault.Severity}
          </div>

        </div>

      </div>

      <div className="mt-5 flex gap-3">

        <Wrench
          className="text-cyan-400 mt-1"
          size={18}
        />

        <p className="text-slate-300 leading-relaxed">
          {fault.Recommendation}
        </p>

      </div>

    </div>
  );
}