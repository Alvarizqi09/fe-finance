import React from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { formatCurrency, calculateProgress } from "../utils/savingsApi";

const SavingsGoalCard = ({
  goal,
  onEdit,
  onDelete,
  onAddContribution,
  onAutoSettings,
}) => {
  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
  const remaining = goal.targetAmount - goal.currentAmount;

  const getProgressColor = (progress) => {
    if (progress === 100) {
      return "bg-emerald-100/50 text-emerald-600";
    }
    return "bg-blue-100/50 text-blue-600";
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/20">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-100 dark:bg-gray-700 rounded-full flex-shrink-0">
        {goal.icon}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {goal.goalName}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {formatCurrency(goal.currentAmount)} /{" "}
            {formatCurrency(goal.targetAmount)}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Actions and Progress */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className={`flex flex-col items-end gap-1`}>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-md ${getProgressColor(
                progress
              )}`}
            >
              <h6 className="text-xs font-medium">{Math.round(progress)}%</h6>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {goal.status === "completed"
                ? "Selesai"
                : `Sisa ${formatCurrency(remaining)}`}
            </span>
          </div>

          <button
            onClick={() => onAddContribution(goal._id)}
            className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-md transition-colors"
            title="Tambah Kontribusi"
          >
            <span className="text-lg">+</span>
          </button>

          <button
            onClick={() => onAutoSettings(goal)}
            className={`p-1.5 rounded-md transition-colors ${
              goal.autoContribute?.enabled
                ? "text-teal-600 dark:text-teal-400 bg-teal-100/50 dark:bg-teal-900/30"
                : "text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            title="Auto Kontribusi"
          >
            ⚙
          </button>

          <button
            onClick={() => onEdit(goal)}
            className="text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
            title="Edit"
          >
            <LuPencil size={18} />
          </button>

          <button
            onClick={() => onDelete(goal._id, goal.goalName)}
            className="text-gray-500 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors"
            title="Hapus"
          >
            <LuTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalCard;
