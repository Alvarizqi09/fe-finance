import React from "react";
import { LuArrowLeft, LuCheck } from "react-icons/lu";
import { MdWarningAmber } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../../components/DashboardLayout";
import SkeletonLoading from "../../components/SkeletonLoading";
import { getAllSavingsGoals, formatCurrency } from "../../utils/savingsApi";

const ContributionHistory = () => {
  const navigate = useNavigate();
  const { goalId } = useParams();

  const { data: goalsData, isPending: isLoading } = useQuery({
    queryKey: ["savingsGoals"],
    queryFn: getAllSavingsGoals,
  });

  const goal = goalsData?.goals?.find((g) => g._id === goalId);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <SkeletonLoading key={i} height="80px" />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (!goal) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Goal tidak ditemukan</p>
          <button
            onClick={() => navigate("/savings")}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
          >
            Kembali ke Savings
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const contributions = goal.contributions
    ? [...goal.contributions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    : [];

  const successContributions = contributions.filter((c) => c.amount > 0);
  const failedContributions = contributions.filter(
    (c) => c.amount === 0 && c.type === "auto"
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-2">
        <button
          onClick={() => navigate("/savings")}
          className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors mb-4"
        >
          <LuArrowLeft className="w-4 h-4" />
          Kembali
        </button>
        <div className="flex flex-row items-center justify-between">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6"
            loading="eager"
          >
            {goal.icon} {goal.goalName}
          </h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Total Terkumpul</p>
          <p className="text-2xl font-bold text-emerald-600 ">
            {formatCurrency(goal.currentAmount)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Target: {formatCurrency(goal.targetAmount)}
          </p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Total Kontribusi</p>
          <p className="text-2xl font-bold text-teal-600 ">
            {successContributions.length}
          </p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Gagal</p>
          <p className="text-2xl font-bold text-red-600 ">
            {failedContributions.length}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">Progress</p>
          <p className="text-sm font-semibold text-emerald-600 mb-2">
            {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full transition-all duration-300"
            style={{
              width: `${Math.min(
                (goal.currentAmount / goal.targetAmount) * 100,
                100
              )}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Contribution History */}
      <div>
        <h2 className="text-sm sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          Riwayat Kontribusi
        </h2>

        {contributions.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-600 mb-4">Belum ada riwayat kontribusi</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contributions.map((contribution, index) => (
              <div key={index} className="card flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {contribution.amount > 0 ? (
                    <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-full">
                      <LuCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
                      <MdWarningAmber className="w-5 h-5 text-red-600" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-gray-900 ">
                      {contribution.amount > 0
                        ? "Kontribusi Berhasil"
                        : "Kontribusi Gagal"}
                    </p>
                    <span
                      className={`text-sm font-bold whitespace-nowrap ${
                        contribution.amount > 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {contribution.amount > 0
                        ? `+${formatCurrency(contribution.amount)}`
                        : "—"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mb-2">
                    {new Date(contribution.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {contribution.note && (
                    <div
                      className={`text-md pl-0 p-2 rounded ${
                        contribution.amount > 0
                          ? " text-emerald-700 "
                          : " text-red-700 "
                      }`}
                    >
                      {contribution.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ContributionHistory;
