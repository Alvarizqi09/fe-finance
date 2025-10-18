import React, { useContext } from "react";
import { UserContext } from "../context/UserContextObject";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../utils/data";

const Sidebar = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    clearUser(); // Clear user context
    navigate("/login", { replace: true }); // Redirect to login page
  };

  const handleClick = (path) => {
    if (path === "logout") {
      handleLogout();
      return;
    }
    navigate(path);
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white shadow-lg p-6 border-r border-gray-200/50 fixed top-[61px] left-0 z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt={user.fullName}
            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80"; // Fallback image
            }}
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 text-center">
          {user?.fullName || "Guest"}
        </h5>
      </div>

      <div className="flex flex-col gap-3">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu === item.label
                ? "text-white bg-primary hover:bg-primary"
                : "text-gray-600 hover:bg-gray-100"
            } py-3 px-6 rounded-lg transition-colors`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
