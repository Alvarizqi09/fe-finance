export const BASE_API_URL = "https://befinanceapp.vercel.app/";
// export const BASE_API_URL = "http://localhost:8000";
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
    GOOGLE_AUTH: "/api/v1/auth/google",
    GOOGLE_CALLBACK: "/api/v1/auth/google/callback",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/delete/${incomeId}`,
    DOWNLOAD_INCOME: "/api/v1/income/download",
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/delete/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/download",
  },
  SAVINGS: {
    CREATE_GOAL: "/api/v1/savings/create",
    GET_ALL_GOALS: "/api/v1/savings/get-all",
    GET_GOAL: (savingsId) => `/api/v1/savings/get/${savingsId}`,
    ADD_MANUAL_CONTRIBUTION: "/api/v1/savings/contribute-manual",
    TOGGLE_AUTO_CONTRIBUTE: "/api/v1/savings/toggle-auto",
    UPDATE_GOAL: (savingsId) => `/api/v1/savings/update/${savingsId}`,
    DELETE_GOAL: (savingsId) => `/api/v1/savings/delete/${savingsId}`,
    GET_HISTORY: (savingsId) => `/api/v1/savings/history/${savingsId}`,
    DOWNLOAD_REPORT: "/api/v1/savings/download-report",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
  AI: {
    CHAT: "/api/v1/ai/chat",
  },
};
