import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { LuImage } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-5">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-primary text-white rounded-lg dark:bg-emerald-600">
          {icon ? (
            <img src={icon} alt="emoji" className="" />
          ) : (
            <LuImage className="" />
          )}
        </div>
        <p className="dark:text-gray-100">
          {icon ? "Change Emoji" : "Select Emoji"}
        </p>
      </div>
      {isOpen && (
        <div className="relative inline-block">
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
          />
          <button
            className="w-7 h-7 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full absolute -top-0 -right-9 cursor-pointer z-20 shadow"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
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
