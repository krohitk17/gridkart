import React from "react";

import { getUserTransactions, getTransactions } from "../Routes/user";
import UserContext from "../Context/context";

const methodStyle =
  "bg-gray-100 rounded-lg h-30 w-full p-4 hover:bg-gray-300 mb-2 font-semibold";
const valueStyleGreen = "ml-auto text-green-500 font-bold";
const valueStyleRed = "ml-auto text-red-500 font-bold";

function convertTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  console.log(formattedDate);
  return formattedDate;
}

function Transaction({ hash, timestamp, amount }) {
  return (
    <div>
      <button className={methodStyle}>
        <div className="flex">
          <a
            href={`https://mumbai.polygonscan.com/tx/${hash}`}
            className="flex flex-col items-start w-full"
          >
            <div className="flex flex-row w-full justify-between">
              <div>{hash}</div>
              <div className={amount < 0 ? "text-red-500" : ""}>{amount}</div>
            </div>
            <div className="text-gray-500">{convertTimestamp(timestamp)}</div>
          </a>
        </div>
      </button>
    </div>
  );
}

function Transactions() {
  const { user, globalVariable } = React.useContext(UserContext);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    if (globalVariable === "user") {
      getUserTransactions(user).then((transactions) => {
        setTransactions(transactions);
      });
    } else {
      getTransactions().then((transactions) => {
        setTransactions(transactions);
      });
    }
  }, []);

  return (
    <>
      <div className="bg-white shadow-lg p-4 min-w-[55em]">
        <div className="font-bold text-lg pb-5">Your Transaction History:</div>

        <div className="pt-2 flex-row">
          {transactions.length === 0 ? (
            <p>Loading...</p>
          ) : (
            transactions.map((transaction) => (
              <Transaction
                key={transaction._id}
                hash={transaction.hash}
                amount={transaction.amount}
                timestamp={transaction.timestamp}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Transactions;
