import React, { useContext, useState } from "react";
import LoadingPopup from "../../components/LoadingPopup";
import ErrorPopup from "../../components/ErrorPopup";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContextObject";
import { LuLockKeyhole } from "react-icons/lu";
import { IoLogInOutline } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setShowError(true);
      return;
    }

    if (!password) {
      setError("Please enter your password");
      setShowError(true);
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <AuthLayout>
      <LoadingPopup show={loading} text="Signing you in..." />
      <ErrorPopup
        show={showError}
        text={error}
        onClose={() => setShowError(false)}
      />
      <div className="w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-xl shadow-emerald-200/50 mb-4 backdrop-blur-xl">
            <LuLockKeyhole className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-2 tracking-tight">
            Welcome Back
          </h3>
          <p className="text-emerald-600/80 text-sm font-medium leading-relaxed">
            Sign in to continue managing your finances
          </p>
        </div>
        <div className="space-y-6 mt-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
              />

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="btn-primary relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <IoLogInOutline className="mr-2 w-5 h-5" />
                Sign In
              </span>
            </button>
          </form>
          <div className="text-center border-t border-white/20">
            <p className="text-emerald-600/80 text-sm">
              Don't have an account?
              <button
                type="button"
                onClick={handleNavigateSignUp}
                className="text-teal-600 hover:text-teal-700 font-semibold transition-colors hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
