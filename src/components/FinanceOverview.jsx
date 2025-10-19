import React from "react";
import CustomPieChart from "./CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#4CAF50"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", value: totalBalance, color: COLORS[0] },
    { name: "Total Income", value: totalIncome, color: COLORS[2] },
    { name: "Total Expense", value: totalExpense, color: COLORS[1] },
  ];
  return (
    <div className="card pt-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Finance Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Finance Overview"
        totalBalance={`Rp. ${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
