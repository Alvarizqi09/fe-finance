import React from "react";
import { LuTrendingUpDown } from "react-icons/lu";
import StatsInfoCard from "./StatsInfoCard";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="w-screen h-screen md:w-[60vw] px-8 md:px-12 py-6 md:py-8 flex flex-col bg-white dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400 mb-6">
          Stack It
        </h2>
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-6 md:p-8 w-full max-w-md mx-auto dark:bg-gray-800/70 dark:border-gray-700/50">
            {children}
          </div>
        </div>
      </div>

      {/* Right Side - Graphics */}
      <div className="hidden md:block w-[40vw] h-screen bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-gray-800 dark:to-gray-900 backdrop-blur-xl overflow-hidden p-8 relative">
        {/* Decorative Elements */}
        <div className="w-48 h-48 rounded-[40px] bg-gradient-to-br from-emerald-200/40 to-teal-200/40 dark:from-emerald-800/30 dark:to-teal-800/30 backdrop-blur-xl absolute -top-7 -left-5 border border-white/60 dark:border-gray-700/60 shadow-xl shadow-emerald-100/30 dark:shadow-black/20"></div>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-white/60 dark:border-gray-700/60 absolute top-[30%] -right-10 shadow-xl shadow-teal-100/20 dark:shadow-black/20"></div>
        <div className="w-48 h-48 rounded-[40px] bg-gradient-to-br from-teal-200/40 to-emerald-200/40 dark:from-teal-800/30 dark:to-emerald-800/30 backdrop-blur-xl absolute -bottom-7 -left-5 border border-white/60 dark:border-gray-700/60 shadow-xl shadow-emerald-100/30 dark:shadow-black/20"></div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 z-20 mt-8">
          <StatsInfoCard
            icon={
              <LuTrendingUpDown className="text-emerald-600 dark:text-emerald-400" />
            }
            label="Cuan vibes only, jangan boncos!"
            value="#NoSkipNabung"
          />
        </div>

        {/* SVG Background Illustration - Box Style */}
        <div className="w-64 lg:w-[85%] absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <BoxFinanceIllustration />
        </div>
      </div>
    </div>
  );
};

// SVG Illustration dengan bentuk kotak dan posisi lebih bawah
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
        x="40"
        y="45"
        className="text-sm font-semibold fill-white transition-colors duration-300"
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        Financial Overview
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

      {/* Financial Indicators */}
      {/* Income Indicator */}
      <circle
        cx="50"
        cy="220"
        r="8"
        className="fill-emerald-400 dark:fill-emerald-500 transition-colors duration-300"
      />
      <text
        x="65"
        y="225"
        className="text-xs fill-gray-700 dark:fill-gray-300 transition-colors duration-300"
        style={{ fontFamily: "system-ui, sans-serif", fontSize: "12px" }}
      >
        Income
      </text>

      {/* Expense Indicator */}
      <circle
        cx="150"
        cy="220"
        r="8"
        className="fill-teal-400 dark:fill-teal-500 transition-colors duration-300"
      />
      <text
        x="165"
        y="225"
        className="text-xs fill-gray-700 dark:fill-gray-300 transition-colors duration-300"
        style={{ fontFamily: "system-ui, sans-serif", fontSize: "12px" }}
      >
        Expense
      </text>

      {/* Savings Indicator */}
      <circle
        cx="250"
        cy="220"
        r="8"
        className="fill-amber-400 dark:fill-amber-500 transition-colors duration-300"
      />
      <text
        x="265"
        y="225"
        className="text-xs fill-gray-700 dark:fill-gray-300 transition-colors duration-300"
        style={{ fontFamily: "system-ui, sans-serif", fontSize: "12px" }}
      >
        Savings
      </text>

      {/* Stats Badge */}
      <rect
        x="300"
        y="200"
        width="80"
        height="40"
        rx="8"
        className="fill-emerald-500/20 dark:fill-emerald-600/20 transition-colors duration-300"
      />
      <text
        x="310"
        y="220"
        className="text-xs font-bold fill-emerald-700 dark:fill-emerald-400 transition-colors duration-300"
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "10px",
          fontWeight: "bold",
        }}
      >
        +12.5%
      </text>
      <text
        x="310"
        y="235"
        className="text-xs fill-emerald-600 dark:fill-emerald-300 transition-colors duration-300"
        style={{ fontFamily: "system-ui, sans-serif", fontSize: "10px" }}
      >
        This Month
      </text>
    </svg>
  );
};

export default AuthLayout;
