import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

/**
 * Create a new savings goal
 */
export const createSavingsGoal = async (goalData) => {
  try {
    const response = await axiosInstance.post(
      API_PATHS.SAVINGS.CREATE_GOAL,
      goalData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating savings goal:", error);
    throw error;
  }
};

/**
 * Get all savings goals for user
 */
export const getAllSavingsGoals = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.SAVINGS.GET_ALL_GOALS);
    return response.data;
  } catch (error) {
    console.error("Error fetching savings goals:", error);
    throw error;
  }
};

/**
 * Get single savings goal with details
 */
export const getSavingsGoal = async (savingsId) => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.SAVINGS.GET_GOAL(savingsId)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching savings goal:", error);
    throw error;
  }
};

/**
 * Add manual contribution to goal
 */
export const addManualContribution = async (savingsId, amount, note = "") => {
  try {
    const response = await axiosInstance.post(
      API_PATHS.SAVINGS.ADD_MANUAL_CONTRIBUTION,
      {
        savingsId,
        amount,
        note,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding manual contribution:", error);
    throw error;
  }
};

/**
 * Toggle auto contribution settings
 */
export const toggleAutoContribute = async (
  savingsId,
  enabled,
  amount = 0,
  frequency = "monthly"
) => {
  try {
    const response = await axiosInstance.put(
      API_PATHS.SAVINGS.TOGGLE_AUTO_CONTRIBUTE,
      {
        savingsId,
        enabled,
        amount,
        frequency,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling auto contribute:", error);
    throw error;
  }
};

/**
 * Update savings goal
 */
export const updateSavingsGoal = async (savingsId, updateData) => {
  try {
    const response = await axiosInstance.put(
      API_PATHS.SAVINGS.UPDATE_GOAL(savingsId),
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating savings goal:", error);
    throw error;
  }
};

/**
 * Delete savings goal
 */
export const deleteSavingsGoal = async (savingsId) => {
  try {
    const response = await axiosInstance.delete(
      API_PATHS.SAVINGS.DELETE_GOAL(savingsId)
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting savings goal:", error);
    throw error;
  }
};

/**
 * Get contribution history for a goal
 */
export const getContributionHistory = async (savingsId) => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.SAVINGS.GET_HISTORY(savingsId)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching contribution history:", error);
    throw error;
  }
};

/**
 * Download savings report
 */
export const downloadSavingsReport = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.SAVINGS.DOWNLOAD_REPORT,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "savings_report.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    return { success: true, message: "Report downloaded successfully" };
  } catch (error) {
    console.error("Error downloading savings report:", error);
    throw error;
  }
};

/**
 * Helper function to calculate progress percentage
 */
export const calculateProgress = (currentAmount, targetAmount) => {
  if (targetAmount <= 0) return 0;
  return Math.min((currentAmount / targetAmount) * 100, 100);
};

/**
 * Helper function to format currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
