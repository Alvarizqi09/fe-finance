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

        {/* SVG Background Illustration */}
        <div className="w-64 lg:w-[90%] absolute bottom-10">
          <FinanceIllustration />
        </div>
      </div>
    </div>
  );
};

// SVG Illustration Component dengan dukungan dark mode
const FinanceIllustration = () => {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-auto shadow-lg shadow-blue-400/15 dark:shadow-blue-400/5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        cx="200"
        cy="150"
        r="120"
        fill="url(#gradient)"
        className="transition-colors duration-300"
      />

      {/* Chart Bars */}
      <rect
        x="140"
        y="110"
        width="20"
        height="80"
        rx="4"
        className="fill-emerald-400 dark:fill-emerald-500 transition-colors duration-300"
      />
      <rect
        x="170"
        y="90"
        width="20"
        height="100"
        rx="4"
        className="fill-teal-400 dark:fill-teal-500 transition-colors duration-300"
      />
      <rect
        x="200"
        y="70"
        width="20"
        height="120"
        rx="4"
        className="fill-emerald-500 dark:fill-emerald-600 transition-colors duration-300"
      />
      <rect
        x="230"
        y="100"
        width="20"
        height="90"
        rx="4"
        className="fill-teal-500 dark:fill-teal-600 transition-colors duration-300"
      />

      {/* Money Bag */}
      <path
        d="M120 180C120 160 140 150 160 150C180 150 200 160 200 180V200H120V180Z"
        className="fill-amber-400 dark:fill-amber-500 transition-colors duration-300"
      />
      <path
        d="M160 150C175 150 190 155 195 170L185 175C182 165 172 160 160 160C148 160 138 165 135 175L125 170C130 155 145 150 160 150Z"
        className="fill-amber-300 dark:fill-amber-400 transition-colors duration-300"
      />

      {/* Coin Stack */}
      <circle
        cx="280"
        cy="180"
        r="15"
        className="fill-amber-300 dark:fill-amber-400 transition-colors duration-300"
      />
      <circle
        cx="280"
        cy="165"
        r="12"
        className="fill-amber-400 dark:fill-amber-500 transition-colors duration-300"
      />
      <circle
        cx="280"
        cy="150"
        r="9"
        className="fill-amber-500 dark:fill-amber-600 transition-colors duration-300"
      />

      {/* Graph Line */}
      <path
        d="M100 120 L140 110 L170 90 L200 70 L230 100 L260 85"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-white dark:text-gray-700 transition-colors duration-300"
      />

      {/* Graph Dots */}
      <circle
        cx="140"
        cy="110"
        r="4"
        className="fill-white dark:fill-gray-300 transition-colors duration-300"
      />
      <circle
        cx="170"
        cy="90"
        r="4"
        className="fill-white dark:fill-gray-300 transition-colors duration-300"
      />
      <circle
        cx="200"
        cy="70"
        r="4"
        className="fill-white dark:fill-gray-300 transition-colors duration-300"
      />
      <circle
        cx="230"
        cy="100"
        r="4"
        className="fill-white dark:fill-gray-300 transition-colors duration-300"
      />
      <circle
        cx="260"
        cy="85"
        r="4"
        className="fill-white dark:fill-gray-300 transition-colors duration-300"
      />

      {/* Definitions */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="transition-colors duration-300">
            <animate
              attributeName="stop-color"
              values="#a7f3d0; #34d399; #a7f3d0"
              dur="8s"
              repeatCount="indefinite"
            />
            <stop
              offset="0%"
              stopColor="#a7f3d0"
              className="dark:stop-color-[#065f46]"
            />
          </stop>
          <stop offset="100%" className="transition-colors duration-300">
            <animate
              attributeName="stop-color"
              values="#34d399; #10b981; #34d399"
              dur="8s"
              repeatCount="indefinite"
            />
            <stop
              offset="100%"
              stopColor="#34d399"
              className="dark:stop-color-[#047857]"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AuthLayout;
