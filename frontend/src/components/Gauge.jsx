export default function Gauge({ score = 0 }) {
  const radius = 70;
  const stroke = 12;

  const normalizedRadius = radius - stroke / 2;

  const circumference = normalizedRadius * 2 * Math.PI;

  const offset =
    circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score <= 20) return "#22c55e"; // Green

    if (score <= 40) return "#eab308"; // Yellow

    if (score <= 60) return "#f97316"; // Orange

    return "#ef4444"; // Red
  };

  return (
    <div className="flex justify-center">

      <div className="relative w-44 h-44">

        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90"
        >
          <circle
            stroke="#1e293b"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <circle
            stroke={getColor()}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col justify-center items-center">

          <span
            className="text-5xl font-bold"
            style={{ color: getColor() }}
          >
            {score}
          </span>

          <span className="text-slate-400">
            Risk Score
          </span>

        </div>

      </div>

    </div>
  );
}