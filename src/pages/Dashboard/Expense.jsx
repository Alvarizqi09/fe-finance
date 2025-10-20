import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { ExpensePageSkeleton } from "../../components/SkeletonLoading";

const Expense = () => {
  const loading = false; // Ganti dengan state loading yang sebenarnya

  if (loading) {
    return (
      <DashboardLayout activeMenu="Expense">
        <ExpensePageSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 gap-6"></div>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
