import React, { useContext } from "react";
import { UserContext } from "../context/UserContextObject";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../utils/data";
import CharAvatar from "./CharAvatar";

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
    <div className="w-56 sm:w-64 h-[calc(100vh-48px)] shadow-lg p-4 sm:p-6 border-r border-gray-200/50 overflow-y-auto sticky top-[48px]">
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3 mb-5 sm:mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt={user.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-400 rounded-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80";
            }}
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-16 sm:w-20"
            height="h-16 sm:h-20"
            style="text-lg sm:text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium text-sm sm:text-base leading-5 sm:leading-6 text-center px-2">
          {user?.fullName || "Guest"}
        </h5>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-3 sm:gap-4 text-sm sm:text-[15px] ${
              activeMenu === item.label
                ? "text-white bg-primary hover:bg-primary"
                : "text-gray-600 hover:bg-gray-100"
            } py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-lg sm:text-xl flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logo at bottom */}
      <div className="mt-auto pt-6 sm:pt-8 flex justify-center items-center">
        <img
          src="/logo-transparent.png"
          alt="Finance App Logo"
          className="w-32 sm:w-40 h-auto opacity-80 hover:opacity-100 transition-opacity"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
