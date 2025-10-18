import React, { useContext } from "react";
import { UserContext } from "../context/UserContextObject";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      <div className="flex">
        <div className="max-[1280px]:hidden">
          {user ? (
            <Sidebar activeMenu={activeMenu} />
          ) : (
            <p>Loading Sidebar...</p>
          )}
        </div>

        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
