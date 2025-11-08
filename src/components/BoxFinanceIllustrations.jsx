// SVG Illustration dengan indicators di tengah
const BoxFinanceIllustration = () => {
  return (
    <svg
      viewBox="0 0 400 280"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main Container Box */}
      <rect
        x="20"
        y="20"
        width="360"
        height="240"
        rx="20"
        className="fill-white/80 dark:fill-gray-800/80 backdrop-blur-sm transition-colors duration-300"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Header Bar */}
      <rect
        x="20"
        y="20"
        width="360"
        height="40"
        rx="20"
        className="fill-emerald-500/90 dark:fill-emerald-600/90 transition-colors duration-300"
      />

      {/* Header Text */}
      <text
        x="200"
        y="45"
        textAnchor="middle"
        className="text-sm font-semibold fill-white transition-colors duration-300"
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        Financial Overview
      </text>

      {/* Stats Badge - di header kanan */}
      <rect
        x="320"
        y="25"
        width="50"
        height="25"
        rx="5"
        className="fill-white/30 dark:fill-gray-900/30 transition-colors duration-300"
      />
      <text
        x="345"
        y="42"
        textAnchor="middle"
        className="text-xs font-bold fill-emerald-700 dark:fill-emerald-300 transition-colors duration-300"
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "10px",
          fontWeight: "bold",
        }}
      >
        +12.5%
      </text>

      {/* Chart Container */}
      <rect
        x="40"
        y="80"
        width="320"
        height="120"
        rx="8"
        className="fill-emerald-50/50 dark:fill-gray-700/50 transition-colors duration-300"
      />

      {/* Chart Grid Lines */}
      <line
        x1="40"
        y1="120"
        x2="360"
        y2="120"
        className="stroke-emerald-200/60 dark:stroke-gray-600/60 transition-colors duration-300"
        strokeWidth="1"
        strokeDasharray="4 2"
      />
      <line
        x1="40"
        y1="160"
        x2="360"
        y2="160"
        className="stroke-emerald-200/60 dark:stroke-gray-600/60 transition-colors duration-300"
        strokeWidth="1"
        strokeDasharray="4 2"
      />

      {/* Chart Bars */}
      <rect
        x="60"
        y="140"
        width="25"
        height="60"
        rx="4"
        className="fill-emerald-400 dark:fill-emerald-500 transition-colors duration-300"
      />
      <rect
        x="100"
        y="100"
        width="25"
        height="100"
        rx="4"
        className="fill-teal-400 dark:fill-teal-500 transition-colors duration-300"
      />
      <rect
        x="140"
        y="80"
        width="25"
        height="120"
        rx="4"
        className="fill-emerald-500 dark:fill-emerald-600 transition-colors duration-300"
      />
      <rect
        x="180"
        y="120"
        width="25"
        height="80"
        rx="4"
        className="fill-teal-500 dark:fill-teal-600 transition-colors duration-300"
      />
      <rect
        x="220"
        y="160"
        width="25"
        height="40"
        rx="4"
        className="fill-emerald-400 dark:fill-emerald-500 transition-colors duration-300"
      />
      <rect
        x="260"
        y="140"
        width="25"
        height="60"
        rx="4"
        className="fill-teal-400 dark:fill-teal-500 transition-colors duration-300"
      />
      <rect
        x="300"
        y="100"
        width="25"
        height="100"
        rx="4"
        className="fill-emerald-500 dark:fill-emerald-600 transition-colors duration-300"
      />

      {/* Financial Indicators - Dipusatkan dengan baik */}
      <g className="transition-colors duration-300">
        {/* Income Indicator - Posisi lebih ke tengah */}
        <circle
          cx="120"
          cy="230"
          r="6"
          className="fill-emerald-400 dark:fill-emerald-500"
        />
        <text
          x="120"
          y="245"
          textAnchor="middle"
          className="text-xs fill-gray-700 dark:fill-gray-300"
          style={{ fontFamily: "system-ui, sans-serif", fontSize: "11px" }}
        >
          Income
        </text>

        {/* Expense Indicator - Tepat di tengah */}
        <circle
          cx="200"
          cy="230"
          r="6"
          className="fill-teal-400 dark:fill-teal-500"
        />
        <text
          x="200"
          y="245"
          textAnchor="middle"
          className="text-xs fill-gray-700 dark:fill-gray-300"
          style={{ fontFamily: "system-ui, sans-serif", fontSize: "11px" }}
        >
          Expense
        </text>

        {/* Savings Indicator - Posisi lebih ke tengah */}
        <circle
          cx="280"
          cy="230"
          r="6"
          className="fill-amber-400 dark:fill-amber-500"
        />
        <text
          x="280"
          y="245"
          textAnchor="middle"
          className="text-xs fill-gray-700 dark:fill-gray-300"
          style={{ fontFamily: "system-ui, sans-serif", fontSize: "11px" }}
        >
          Savings
        </text>
      </g>
    </svg>
  );
};
export default BoxFinanceIllustration;
