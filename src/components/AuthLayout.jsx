import React from "react";
import { LuTrendingUpDown } from "react-icons/lu";
import StatsInfoCard from "./StatsInfoCard";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-screen h-screen md:w-[60vw] px-8 md:px-12 py-6 md:py-8 flex flex-col">
        <h2 className="text-xl font-semibold text-emerald-700 mb-6">
          Stack It
        </h2>
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-6 md:p-8 w-full max-w-md mx-auto">
            {children}
          </div>
        </div>
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-xl overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-gradient-to-br from-emerald-200/40 to-teal-200/40 backdrop-blur-xl absolute -top-7 -left-5 border border-white/60 shadow-xl shadow-emerald-100/30"></div>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-white/60 absolute top-[30%] -right-10 shadow-xl shadow-teal-100/20"></div>
        <div className="w-48 h-48 rounded-[40px] bg-gradient-to-br from-teal-200/40 to-emerald-200/40 backdrop-blur-xl absolute -bottom-7 -left-5 border border-white/60 shadow-xl shadow-emerald-100/30"></div>

        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Cuan vibes only, jangan boncos!"
            value="#NoSkipNabung"
          />
        </div>

        <img
          src="/8432.png"
          alt="Auth Background"
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
