import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionCard from "./TransactionCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => (
          <TransactionCard
            key={item._id}
            title={item.type == "expense" ? item.source : item.source}
            icon={item.icon}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
