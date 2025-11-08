import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { INCOME_SOURCES } from "../utils/data";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    amount: "",
    source: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  return (
    <div className="p-4 bg-white/80 rounded-2xl shadow-lg border border-gray-200/50 dark:bg-gray-800/50 dark:border-gray-700/50">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Select
        value={income.source}
        onChange={(e) => handleChange("source", e.target.value)}
        label="Source"
        placeholder="Pilih sumber income"
        options={INCOME_SOURCES}
        optionClassName="bg-white dark:bg-gray-700 hover:bg-emerald-600 focus:bg-emerald-700 transition-colors"
      />
      <Input
        value={income.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        placeholderColor="placeholder-gray-500 dark:placeholder-gray-400"
      />
      <Input
        value={income.date}
        onChange={(e) => handleChange("date", e.target.value)}
        label="Date"
        type="date"
        placeholder="Select date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="add-btn add-btn-fill dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-700 dark:hover:to-teal-700"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
