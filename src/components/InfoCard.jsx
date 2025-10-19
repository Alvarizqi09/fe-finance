import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className={`flex gap-3 sm:gap-4 md:gap-6 items-center p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-lg border border-gray-200 rounded-xl sm:rounded-2xl transition-shadow duration-200`}
    >
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center text-xl sm:text-2xl md:text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h6 className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1 truncate">
          {label}
        </h6>
        <span className="text-gray-700 font-semibold text-base sm:text-lg md:text-xl lg:text-[22px] block truncate">
          Rp. {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
