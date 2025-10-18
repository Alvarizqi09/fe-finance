import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "./UserContextObject";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      const userData = response.data.user || response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  };

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData: () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          return parsed;
        } catch {
          return null;
        }
      }
      return null;
    },
  });

  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    queryClient.setQueryData(["user"], userData);
  };

  const clearUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    queryClient.setQueryData(["user"], null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
