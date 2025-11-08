import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { ExpensePageSkeleton } from "../../components/SkeletonLoading";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/AddExpenseForm";
import DeleteAlert from "../../components/DeleteAlert";
import ExpenseOverview from "../../components/ExpenseOverview";
import ExpenseList from "../../components/ExpenseList";
import { generateExpenseExcelReport } from "../../utils/excelGenerator";
import { useQueryClient } from "@tanstack/react-query";

const Expense = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false); // Ganti dengan state loading yang sebenarnya

  const fetchExpenseData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data && Array.isArray(response.data.expense)) {
        setExpenseData(response.data.expense);
      } else {
        setExpenseData([]);
      }
    } catch (error) {
      console.error("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { source, amount, date, icon } = expense;

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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      fetchExpenseData();
      // Invalidate dashboard data to refresh it when user navigates back
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      toast.success("Expense added successfully");
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseData();
      // Invalidate dashboard data to refresh it when user navigates back
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseData();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <DashboardLayout activeMenu="Expense">
        <ExpensePageSkeleton />
      </DashboardLayout>
    );
  }
  const handleDownloadExpenseReport = async () => {
    try {
      if (expenseData.length === 0) {
        toast.error("No expense data available to download");
        return;
      }

      // Generate Excel report using the new utility function
      const fileName = generateExpenseExcelReport(
        expenseData,
        "Expense_Report"
      );
      toast.success(`Report downloaded successfully: ${fileName}`);
    } catch (error) {
      console.error("Error downloading expense report:", error);
      toast.error("Failed to download expense report. Please try again.");
    }
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseReport}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
