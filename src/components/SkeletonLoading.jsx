import React from "react";

// Skeleton untuk Info Card
export const InfoCardSkeleton = () => {
  return (
    <div className="card bg-white overflow-hidden relative">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
    </div>
  );
};

// Skeleton untuk Chart
export const ChartSkeleton = ({ height = "300px" }) => {
  return (
    <div className="card bg-white overflow-hidden relative">
      <div className="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
      <div
        className="bg-gradient-to-t from-gray-100 to-gray-200 rounded-lg relative overflow-hidden"
        style={{ height }}
      >
        <div className="flex items-end justify-around h-full px-4 pb-4 gap-2">
          <div
            className="w-full bg-gray-300 rounded-t-lg animate-pulse"
            style={{ height: "60%" }}
          ></div>
          <div
            className="w-full bg-gray-300 rounded-t-lg animate-pulse delay-75"
            style={{ height: "80%" }}
          ></div>
          <div
            className="w-full bg-gray-300 rounded-t-lg animate-pulse delay-150"
            style={{ height: "45%" }}
          ></div>
          <div
            className="w-full bg-gray-300 rounded-t-lg animate-pulse delay-300"
            style={{ height: "70%" }}
          ></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
    </div>
  );
};

// Skeleton untuk Pie Chart
export const PieChartSkeleton = () => {
  return (
    <div className="card bg-white overflow-hidden relative">
      <div className="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
      <div className="flex items-center justify-center py-8">
        <div className="w-48 h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full relative animate-pulse">
          <div className="absolute inset-4 bg-white rounded-full"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
    </div>
  );
};

// Skeleton untuk Transaction List
export const TransactionListSkeleton = ({ count = 5 }) => {
  return (
    <div className="card bg-white overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>
      <div className="space-y-4">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"></div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-100 rounded w-24 animate-pulse"></div>
            </div>
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
    </div>
  );
};

// Skeleton untuk Income Overview
export const IncomeOverviewSkeleton = () => {
  return (
    <div className="card bg-white overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-8 bg-gray-300 rounded w-40 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
      <div className="h-4 bg-gray-100 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
    </div>
  );
};

// Skeleton untuk Dashboard Grid
export const DashboardGridSkeleton = () => {
  return (
    <div className="w-full mx-auto pb-10">
      <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse"></div>

      {/* Info Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6">
        <InfoCardSkeleton />
        <InfoCardSkeleton />
        <InfoCardSkeleton />
      </div>

      {/* Charts and Transactions Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 pb-6">
        <TransactionListSkeleton count={4} />
        <PieChartSkeleton />
        <TransactionListSkeleton count={3} />
        <ChartSkeleton height="280px" />
        <PieChartSkeleton />
        <TransactionListSkeleton count={4} />
      </div>
    </div>
  );
};

// Skeleton untuk Income Page
export const IncomePageSkeleton = () => {
  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <IncomeOverviewSkeleton />
        <TransactionListSkeleton count={6} />
      </div>
    </div>
  );
};

// Skeleton untuk Expense Page
export const ExpensePageSkeleton = () => {
  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="card bg-white animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-20 bg-gray-100 rounded-lg"></div>
            <div className="h-20 bg-gray-100 rounded-lg"></div>
            <div className="h-20 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
        <TransactionListSkeleton count={8} />
      </div>
    </div>
  );
};

export default DashboardGridSkeleton;

// Skeleton untuk Form Modal
export const FormSkeleton = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 z-10">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Icon Picker */}
          <div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2 animate-pulse"></div>
            <div className="flex gap-2 flex-wrap">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          ))}

          {/* Textarea */}
          <div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          {/* Checkbox */}
          <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
