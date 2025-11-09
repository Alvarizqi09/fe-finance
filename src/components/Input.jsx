import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  value,
  onChange,
  type,
  label,
  placeholder,
  textColor,
  placeholderColor,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Custom placeholder untuk date input
  const renderDatePlaceholder = () => {
    if (type === "date" && !value) {
      return (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          {placeholder || ""}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col relative">
      <label className="mb-3 text-sm text-emerald-700 dark:text-emerald-300 font-semibold">
        {label}
      </label>
      <div className="input-box dark:bg-gray-700/40 dark:border-gray-600/50 relative">
        <input
          value={value}
          onChange={(e) => onChange(e)}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={type === "date" ? "" : placeholder} // Kosongkan placeholder untuk date
          className={
            className ||
            `flex-1 bg-transparent outline-none ${
              textColor || "text-gray-700 dark:text-gray-100"
            } ${type === "date" && !value ? "text-transparent" : ""} ${
              placeholderColor ||
              "placeholder-gray-500 dark:placeholder-gray-400"
            } font-medium w-full`
          }
        />
        {renderDatePlaceholder()}
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer transition-colors"
                onClick={() => togglePassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer transition-colors"
                onClick={() => togglePassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
