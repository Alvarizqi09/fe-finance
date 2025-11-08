import React from "react";
import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from "react-icons/lu";

const TransactionCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn = false,
  onDelete = () => {},
}) => {
  const getAmountStyles = (type) => {
    if (type === "income") {
      return "bg-green-50 text-green-500";
    } else {
      return "bg-red-100/50 text-red-600";
    }
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/20">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="mt-1 flex items-center gap-3">
          {!hideDeleteBtn && (
            <button
              className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles(
              type
            )}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} {amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
