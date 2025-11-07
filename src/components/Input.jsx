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
      <label className="mb-3 text-sm text-emerald-700 font-semibold">
        {label}
      </label>
      <div className="input-box">
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
              textColor || "text-gray-700"
            } ${placeholderColor || "placeholder-gray-500"} font-medium`
          }
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors"
                onClick={() => togglePassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors"
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
