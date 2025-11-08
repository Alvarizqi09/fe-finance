import axios from "axios";
import { BASE_API_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    } else if (error.response && error.response.status === 500) {
      console.error("Internal Server Error");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
