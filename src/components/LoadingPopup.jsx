import React from "react";
import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";

const LoadingPopup = ({ show, text = "Loading..." }) => {
  if (!show) return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl px-8 py-8 min-w-[220px]">
        <ClipLoader color="#10b981" size={48} speedMultiplier={1.2} />
        <span className="mt-4 text-emerald-700 font-semibold text-lg animate-pulse">
          {text}
        </span>
      </div>
    </div>,
    document.body
  );
};

export default LoadingPopup;
