import React, { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "./CustomBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">Income Overview</h2>
          <p className="text-xs mt-0.5 text-gray-600">
            This is a brief overview of your income.
          </p>
        </div>

        <button onClick={onAddIncome} className="add-btn">
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
