const StatsInfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex gap-6 bg-white/50 dark:bg-gray-800/80 backdrop-blur-2xl border border-white/70 dark:border-gray-700/60 p-6 rounded-3xl shadow-2xl shadow-emerald-100/40 dark:shadow-black/30 z-10">
      <div
        className={`w-14 h-14 flex items-center justify-center text-white bg-gradient-to-br from-emerald-400 to-teal-500 dark:from-emerald-600 dark:to-teal-600 text-[28px] rounded-2xl shadow-xl shadow-emerald-200/40 dark:shadow-emerald-900/40`}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <h6 className="text-xs mb-1 text-emerald-600/80 dark:text-emerald-300/80 font-medium">
          {label}
        </h6>
        <span className="text-[22px] text-emerald-700 dark:text-emerald-400 font-bold">
          {value}
        </span>
      </div>
    </div>
  );
};

export default StatsInfoCard;
