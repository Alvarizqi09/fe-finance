import React, { useContext, useState } from "react";
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

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = null;

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!fullName || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError(null);

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

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
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
    }
  };

  const handleNavigateLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-1 mb-6">
          Please enter your details to create an account
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profile} setImage={setProfile} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              label="Full Name"
              placeholder="Full Name"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email Address"
              placeholder="Email"
            />
          </div>
          <div className="col-span-2">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              placeholder="Password"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-3">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleNavigateLogin}
              className="text-primary underline font-medium"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
