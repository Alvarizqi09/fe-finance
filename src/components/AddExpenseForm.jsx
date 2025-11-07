import React, { useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

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
      <Input
        value={expense.source}
        onChange={(e) => handleChange("source", e.target.value)}
        label="Source"
        placeholder="Freelance, Gaji, dan lainnya"
        type="text"
        textColor="text-white"
        className="bg-gray-700 border border-gray-600 rounded-md p-2"
        placeholderColor="placeholder-white"
      />
      <Input
        value={expense.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        textColor="text-white"
        placeholderColor="placeholder-white"
        className="bg-gray-700 border border-gray-600 rounded-md p-2"
      />
      <Input
        value={expense.date}
        onChange={(e) => handleChange("date", e.target.value)}
        label="Date"
        type="date"
        placeholder=""
        textColor="text-white"
        className="bg-gray-700 border border-gray-600 rounded-md p-2"
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
