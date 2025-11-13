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
import { FcGoogle } from "react-icons/fc";
import { initiateGoogleLogin } from "../../utils/googleAuthHandler";

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
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-xl shadow-emerald-200/50 dark:shadow-emerald-800/30 mb-4 backdrop-blur-xl">
            <LuLockKeyhole className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-2 tracking-tight">
            Welcome Back
          </h3>
          <p className="text-emerald-600/80 dark:text-gray-300 text-sm font-medium leading-relaxed">
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
                className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="btn-primary relative overflow-hidden group dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-700 dark:hover:to-teal-700"
            >
              <span className="relative z-10 flex items-center justify-center">
                <IoLogInOutline className="mr-2 w-5 h-5" />
                Sign In
              </span>
            </button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={initiateGoogleLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors font-medium text-gray-700 dark:text-gray-200"
          >
            <FcGoogle className="w-5 h-5" />
            Sign in with Google
          </button>
          <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-emerald-600/80 dark:text-gray-400 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleNavigateSignUp}
                className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold transition-colors hover:underline ml-1"
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
