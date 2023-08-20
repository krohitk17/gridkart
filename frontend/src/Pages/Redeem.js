import React from "react";
import RedeemItem from "./RedeemItem";
import UserContext from "../Context/context";

import { getAvailableRewards } from "../Routes/event";
import { completeEvent } from "../Routes/user";

function Redeem() {
  const { user } = React.useContext(UserContext);
  const { balance } = React.useContext(UserContext);

  const [rewards, setRewards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  function onClick(target) {
    completeEvent(user, target._id).then(() => {
      window.location.reload();
    });
  }

  React.useEffect(() => {
    setLoading(true);
    getAvailableRewards(user).then((rewards) => {
      setRewards(rewards);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="bg-white shadow-lg p-4 w-[55em]">
        <div className="flex">
          <div className="font-bold text-lg">Redeem your SuperTokens:</div>
          <div className="ml-auto font-bold text-lg">Balance: {balance}</div>
        </div>
        <div className="pt-2 flex flex-wrap justify-evenly ">
          {/* image of product */}
          {loading ? (
            <p>loading</p>
          ) : (
            rewards.map((reward) => (
              <RedeemItem
                key={reward._id}
                name={reward.description}
                cost={reward.amount}
                img={reward.image}
                onClick={() => onClick(reward)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Redeem;
