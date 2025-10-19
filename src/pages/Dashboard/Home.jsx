import React, { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/InfoCard";
import { addThounsandSeparators } from "../../utils/helper";
import { IoMdCard } from "react-icons/io";
import RecentTransactions from "../../components/RecentTransactions";
import FinanceOverview from "../../components/FinanceOverview";
import ExpenseTransactions from "../../components/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Last30DaysExpenses";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, [fetchDashboardData]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="w-full mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThounsandSeparators(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="Total Income"
            value={addThounsandSeparators(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<IoMdCard />}
            label="Total Expenses"
            value={addThounsandSeparators(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 ">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last7DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
