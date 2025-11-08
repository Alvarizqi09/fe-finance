import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { LuImage } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-5">
      <div
        className="flex items-center gap-4 cursor-pointer p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors border border-gray-200/50 dark:bg-gray-700/40 dark:border-gray-600/50 dark:hover:bg-gray-700/60"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-primary text-white rounded-lg dark:bg-emerald-600">
          {icon ? (
            <img src={icon} alt="emoji" className="w-6 h-6" />
          ) : (
            <LuImage className="" />
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-100 font-medium">
          {icon ? "Change Emoji" : "Select Emoji"}
        </p>
      </div>
      {isOpen && (
        <div className="relative inline-block">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <EmojiPicker
              open={isOpen}
              onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
            />
          </div>
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 cursor-pointer z-20 shadow-lg dark:bg-gray-700 dark:border-gray-600"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            onClick={() => setIsOpen(false)}
            aria-label="Close emoji picker"
          >
            <FaXmark className="text-black dark:text-white text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
