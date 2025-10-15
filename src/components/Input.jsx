import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, type, label, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-[13px] text-slate-800">{label}</label>
      <div className="input-box ">
        <input
          value={value}
          onChange={(e) => onChange(e)}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="border border-slate-300 p-2 rounded-md"
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => togglePassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-primary cursor-pointer"
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
