import React from "react";

const Select = ({
  value,
  onChange,
  label,
  name,
  options = [],
  placeholder = "Select an option",
  textColor,
  className,
  optionClassName,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-3 text-sm text-emerald-700 dark:text-emerald-300 font-semibold">
        {label}
      </label>
      <div className="input-box dark:bg-gray-700/40 dark:border-gray-600/50">
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
          className={
            className ||
            `flex-1 bg-transparent outline-none ${
              textColor || "text-gray-700 dark:text-gray-100"
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
