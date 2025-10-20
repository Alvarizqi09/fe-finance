import React, { useEffect, useState, useCallback } from "react";
import CustomPieChart from "./CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#4CAF50"];

const RecentIncomeChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = useCallback(() => {
    const dataArray =
      data?.map((item) => ({
        name: item?.source || "Unknown",
        value: item?.amount || 0,
      })) || [];
    setChartData(dataArray);
  }, [data]);

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [prepareChartData]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Recent Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Recent Income"
        totalBalance={`Rp. ${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeChart;
