const StatsInfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex gap-4 sm:gap-6 bg-white/50 dark:bg-gray-800/80 backdrop-blur-2xl border border-white/70 dark:border-gray-700/60 p-5 sm:p-6 rounded-3xl shadow-2xl shadow-emerald-100/40 dark:shadow-black/30 z-10">
      <div
        className={`w-16 h-16 sm:w-14 sm:h-14 flex items-center justify-center text-white bg-gradient-to-br from-emerald-400 to-teal-500 dark:from-emerald-600 dark:to-teal-600 text-[32px] sm:text-[28px] rounded-2xl shadow-xl shadow-emerald-200/40 dark:shadow-emerald-900/40 flex-shrink-0`}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <h6 className="text-xs sm:text-xs mb-1 text-emerald-600/80 dark:text-emerald-300/80 font-medium line-clamp-2">
          {label}
        </h6>
        <span className="text-xl sm:text-[22px] text-emerald-700 dark:text-emerald-400 font-bold truncate">
          {value}
        </span>
      </div>
    </div>
  );
};

export default StatsInfoCard;
