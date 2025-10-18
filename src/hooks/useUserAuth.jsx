import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContextObject";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && user) {
      clearUser();
      navigate("/login", { replace: true });
    }
  }, [user, clearUser, navigate]);

  return user;
};
