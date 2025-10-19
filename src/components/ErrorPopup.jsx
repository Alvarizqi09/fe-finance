import { createPortal } from "react-dom";

const ErrorPopup = ({ show, text = "Terjadi kesalahan", onClose }) => {
  if (!show) return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl px-8 py-8 min-w-[220px] relative">
        <svg
          className="w-10 h-10 text-red-500 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
          />
        </svg>
        <span className="mb-4 text-red-700 font-semibold text-lg text-center">
          {text}
        </span>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ErrorPopup;
