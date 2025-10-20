import React, { useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

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
    <div className="p-4">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.source}
        onChange={(e) => handleChange("source", e.target.value)}
        label="Source"
        placeholder="Freelance, Gaji, dan lainnya"
        type="text"
        textColor="text-white"
        placeholderColor="placeholder-white"
      />
      <Input
        value={income.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        textColor="text-white"
        placeholderColor="placeholder-white"
      />
      <Input
        value={income.date}
        onChange={(e) => handleChange("date", e.target.value)}
        label="Date"
        type="date"
        placeholder=""
        textColor="text-white"
      />
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
