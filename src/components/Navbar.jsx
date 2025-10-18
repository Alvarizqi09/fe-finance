import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Sidebar from "./Sidebar";

const Navbar = ({ activeMenu }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex gap-5 shadow-lg bg-transparent border-b border-gray-200/50">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        {openSidebar ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-black">Finance App</h2>
      {openSidebar && (
        <div className="fixed top-[61px] ml-2 bg-white">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
