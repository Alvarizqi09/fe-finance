import React from "react";

const Select = ({
  value,
  onChange,
  label,
  options = [],
  placeholder = "Select an option",
  textColor,
  className,
  optionClassName,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-3 text-sm text-emerald-700 font-semibold">
        {label}
      </label>
      <div className="input-box">
        <select
          value={value}
          onChange={(e) => onChange(e)}
          className={
            className ||
            `flex-1 bg-transparent outline-none ${
              textColor || "text-gray-700"
            } font-medium cursor-pointer`
          }
        >
          <option value="" disabled className={optionClassName}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={optionClassName}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
