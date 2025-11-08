import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import { Income } from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import AIChatbot from "./components/AIChatbot";

function App() {
  // Only show AIChatbot if not on /login or /signup
  const currentPath = window.location.pathname;
  const showChatbot = currentPath !== "/login" && currentPath !== "/signup";
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />

      {/* AI Chatbot - Only visible if not on login/signup */}
      {showChatbot && <AIChatbot />}
    </UserProvider>
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
