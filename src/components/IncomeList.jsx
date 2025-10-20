import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionCard from "./TransactionCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Income Sources</h5>

        <button onClick={onDownload} className="card-btn">
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionCard
            key={income._id}
            title={income.source}
            amount={income.amount}
            icon={income.icon}
            date={moment(income.date).format("DD MMM, YYYY")}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
