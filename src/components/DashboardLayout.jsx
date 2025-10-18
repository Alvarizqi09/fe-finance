import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContextObject";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      {openSidebar && (
        <div
          className="min-[1280px]:hidden fixed inset-0 bg-black/30 z-30 top-[48px]"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      <div className="flex">
        <div className="max-[1280px]:hidden flex-shrink-0">
          {user ? (
            <Sidebar activeMenu={activeMenu} />
          ) : (
            <div className="w-64 h-[calc(100vh-48px)] flex items-center justify-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
        </div>
        <div
          className={`min-[1280px]:hidden fixed top-[48px] left-0 z-40 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            openSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {user && <Sidebar activeMenu={activeMenu} />}
        </div>
        <div className="flex-1 min-w-0 px-3 sm:px-4 md:px-5 py-4 sm:py-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
