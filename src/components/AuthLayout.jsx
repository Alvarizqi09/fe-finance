import React from "react";
import { LuTrendingUpDown } from "react-icons/lu";
import StatsInfoCard from "./StatsInfoCard";
import BoxFinanceIllustration from "./BoxFinanceIllustrations";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full md:w-[60%] h-screen md:h-auto overflow-y-auto px-6 sm:px-8 md:px-12 py-6 md:py-8 flex flex-col bg-gradient-to-br from-emerald-50/90 to-teal-50/90 dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg sm:text-xl font-semibold text-emerald-700 dark:text-emerald-400 mb-6 flex-shrink-0">
          Stack It
        </h2>
        <div className="flex-1 flex items-center justify-center py-6 md:py-0">
          <div className="glass-card p-5 sm:p-6 md:p-8 w-full max-w-md mx-auto dark:bg-gray-800/80 dark:border-gray-700/60">
            {children}
          </div>
        </div>
      </div>

      {/* Right Side - Graphics */}
      <div className="hidden md:flex md:w-[40%] h-screen bg-gradient-to-br from-emerald-100/80 to-teal-100/80 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 backdrop-blur-xl overflow-hidden p-8 relative flex-col items-center justify-between">
        {/* Decorative Elements */}
        <div className="w-48 h-48 rounded-[40px] bg-gradient-to-br from-emerald-200/40 to-teal-200/40 dark:from-gray-700/60 dark:to-gray-600/60 backdrop-blur-xl absolute -top-7 -left-5 border border-white/60 dark:border-gray-600/60 shadow-xl shadow-emerald-100/30 dark:shadow-black/30"></div>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-white/60 dark:border-gray-600/60 absolute top-[30%] -right-10 shadow-xl shadow-teal-100/20 dark:shadow-black/30"></div>
        <div className="w-48 h-48 rounded-[40px] bg-gradient-to-br from-teal-200/40 to-emerald-200/40 dark:from-gray-600/60 dark:to-gray-700/60 backdrop-blur-xl absolute -bottom-7 -left-5 border border-white/60 dark:border-gray-600/60 shadow-xl shadow-emerald-100/30 dark:shadow-black/30"></div>

        {/* Stats Card */}
        <div className="relative z-20 w-full max-w-sm">
          <StatsInfoCard
            icon={
              <LuTrendingUpDown className="text-emerald-600 dark:text-emerald-400" />
            }
            label="Cuan vibes only, jangan boncos!"
            value="#NoSkipNabung"
          />
        </div>

        {/* SVG Background Illustration - Box Style */}
        <div className="relative z-10 w-56 lg:w-80 flex-shrink-0">
          <BoxFinanceIllustration />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
