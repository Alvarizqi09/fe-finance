import moment from "moment";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionCard from "./TransactionCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Last 7 Days Expenses</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5).map((expense) => (
          <TransactionCard
            key={expense._id}
            title={expense.source}
            icon={expense.icon}
            date={moment(expense.date).format("DD MMM YYYY")}
            amount={expense.amount}
            type={"expense"}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
