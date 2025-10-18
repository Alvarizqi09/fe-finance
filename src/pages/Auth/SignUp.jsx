import React, { useContext, useState } from "react";
import LoadingPopup from "../../components/LoadingPopup";
import ErrorPopup from "../../components/ErrorPopup";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContextObject";
import uploadImage from "../../utils/uploadImage";
const SignUp = () => {
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = null;

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setShowError(true);
      return;
    }

    if (!fullName || !password) {
      setError("Please fill in all fields");
      setShowError(true);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setShowError(true);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      if (profile) {
        const imgUploadRes = await uploadImage(profile);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <AuthLayout>
      <LoadingPopup show={loading} text="Creating your account..." />
      <ErrorPopup
        show={showError}
        text={error}
        onClose={() => setShowError(false)}
      />
      <div className="w-full">
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-2 tracking-tight">
            Create Account
          </h3>
          <p className="text-emerald-600/80 text-sm font-medium leading-relaxed">
            Join us and start managing your finances
          </p>
        </div>
        <div className="space-y-5">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="flex justify-center mb-4">
              <ProfilePhotoSelector image={profile} setImage={setProfile} />
            </div>
            <div className="space-y-4">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                />

                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="Password"
                  placeholder="Min. 8 characters"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Create Account
              </span>
            </button>
          </form>
          <div className="text-center pt-4 border-t border-white/20">
            <p className="text-emerald-600/80 text-sm">
              Already have an account?
              <button
                type="button"
                onClick={handleNavigateLogin}
                className="text-teal-600 hover:text-teal-700 font-semibold transition-colors hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
