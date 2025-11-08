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
  return (
    <div className="flex flex-col">
      <label className="mb-3 text-sm text-emerald-700 dark:text-emerald-300 font-semibold">
        {label}
      </label>
      <div className="input-box dark:bg-gray-700/40 dark:border-gray-600/50">
        <input
          value={value}
          onChange={(e) => onChange(e)}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className={
            className ||
            `flex-1 bg-transparent outline-none ${
              textColor || "text-gray-700 dark:text-gray-100"
            } ${
              placeholderColor ||
              "placeholder-gray-500 dark:placeholder-gray-400"
            } font-medium`
          }
        />
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
