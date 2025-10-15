import React, { useContext, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContextObject";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    try {
      const respone = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = respone.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleNavigateSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1 mb-6">
          Please enter your credentials to continue
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email Address"
            placeholder="Email"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="Password"
            placeholder="Password"
          />

          {error && <p className="text-red-500 text-xs pb-3">{error}</p>}

          <button type="submit" className="btn-primary">
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Dont have an account?{" "}
            <button
              type="button"
              onClick={handleNavigateSignUp}
              className="text-primary underline font-medium"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
