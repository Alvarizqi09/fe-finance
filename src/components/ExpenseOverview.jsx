import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "./CustomBarChart";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">Expense Overview</h2>
          <p className="text-xs mt-0.5 text-gray-600">
            This is a brief overview of your expenses.
          </p>
        </div>

        <button onClick={onAddExpense} className="add-btn">
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
