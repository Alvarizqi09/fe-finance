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

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-emerald-600 dark:text-emerald-400";
      case "paused":
        return "text-amber-600 dark:text-amber-400";
      default:
        return "text-teal-600 dark:text-teal-400";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100/50 dark:bg-emerald-900/20";
      case "paused":
        return "bg-amber-100/50 dark:bg-amber-900/20";
      default:
        return "bg-teal-100/50 dark:bg-teal-900/20";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-3xl">{goal.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {goal.goalName}
            </h3>
            <p className={`text-xs font-medium ${getStatusColor(goal.status)}`}>
              {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {formatCurrency(goal.currentAmount)}
          </span>
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Target: {formatCurrency(goal.targetAmount)} | Sisa:{" "}
          {formatCurrency(remaining)}
        </p>
      </div>

      {/* Auto Contribute Info */}
      {goal.autoContribute?.enabled && (
        <div className={`${getStatusBg(goal.status)} rounded-lg p-3 mb-4`}>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Auto: {formatCurrency(goal.autoContribute.amount)}/{" "}
            {goal.autoContribute.frequency}
          </p>
          {goal.autoContribute.nextContributionDate && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Kontribusi berikutnya:{" "}
              {new Date(
                goal.autoContribute.nextContributionDate
              ).toLocaleDateString("id-ID")}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onAddContribution(goal._id, goal.goalName)}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
        >
          + Kontribusi
        </button>
        <button
          onClick={() => onAutoSettings(goal)}
          className={`flex-1 border text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
            goal.autoContribute?.enabled
              ? "bg-teal-100 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          Auto
        </button>
        <button
          onClick={() => onEdit(goal)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Edit"
        >
          <LuPencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(goal._id, goal.goalName)}
          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          title="Delete"
        >
          <LuTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SavingsGoalCard;
