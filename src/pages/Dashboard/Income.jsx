import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import IncomeOverview from "../../components/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { IncomePageSkeleton } from "../../components/SkeletonLoading";
import { generateIncomeExcelReport } from "../../utils/excelGenerator";

export const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchIncomeData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data && Array.isArray(response.data.incomes)) {
        setIncomeData(response.data.incomes);
      } else {
        setIncomeData([]);
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      fetchIncomeData();
      toast.success("Income added successfully");
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income. Please try again.");
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeData();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income. Please try again.");
    }
  };

  const handleDownloadIncomeReport = async () => {
    try {
      if (incomeData.length === 0) {
        toast.error("No income data available to download");
        return;
      }

      // Generate Excel report using the new utility function
      const fileName = generateIncomeExcelReport(incomeData, "Income_Report");
      toast.success(`Report downloaded successfully: ${fileName}`);
    } catch (error) {
      console.error("Error downloading income report:", error);
      toast.error("Failed to download income report. Please try again.");
    }
  };

  useEffect(() => {
    fetchIncomeData();

    return () => {};
  }, []);

  if (loading) {
    return (
      <DashboardLayout activeMenu="Income">
        <IncomePageSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Income">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeReport}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income source?"
            onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};
