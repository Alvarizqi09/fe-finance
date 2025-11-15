import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import { Income } from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Savings from "./pages/Dashboard/Savings";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import AIChatbot from "./components/AIChatbot";
import { handleGoogleAuthCallback } from "./utils/googleAuthHandler";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContextObject";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/" ||
      location.search.includes("token=")
    ) {
      handleGoogleAuthCallback(updateUser, navigate);
    }
  }, [location, updateUser, navigate]);

  const showChatbot =
    location.pathname !== "/login" && location.pathname !== "/signup";
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/savings" element={<Savings />} />
        </Routes>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
      {showChatbot && <AIChatbot />}
    </>
  );
}

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
