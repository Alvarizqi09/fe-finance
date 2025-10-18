import React from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-5 shadow-lg bg-white border-b border-gray-200/50 h-12 sm:h-14 px-3 sm:px-4 sticky top-0 z-50">
      <button
        className="min-[1280px]:hidden text-gray-700 hover:text-gray-900 p-1 hover:bg-gray-100 rounded-md transition-colors"
        onClick={() => setOpenSidebar(!openSidebar)}
        aria-label="Toggle Sidebar"
      >
        {openSidebar ? (
          <HiOutlineX className="text-xl sm:text-2xl" />
        ) : (
          <HiOutlineMenu className="text-xl sm:text-2xl" />
        )}
      </button>

      <h2 className="text-base sm:text-lg md:text-xl font-bold text-emerald-700 truncate">
        Finance App
      </h2>
    </div>
  );
};

export default Navbar;
