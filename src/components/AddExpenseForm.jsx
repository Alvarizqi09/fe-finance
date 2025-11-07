import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { EXPENSE_SOURCES } from "../utils/data";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    amount: "",
    source: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  return (
    <div className="p-4 bg-gray-600">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Select
        value={expense.source}
        onChange={(e) => handleChange("source", e.target.value)}
        label="Source"
        placeholder="Pilih kategori expense"
        options={EXPENSE_SOURCES}
        textColor="text-white"
        optionClassName="bg-gray-700 text-white hover:bg-emerald-600 focus:bg-emerald-700 transition-colors"
      />
      <Input
        value={expense.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        textColor="text-white"
        placeholderColor="placeholder-white"
      />
      <Input
        value={expense.date}
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
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
