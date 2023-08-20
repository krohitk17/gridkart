import React from "react";
import UserLogo from "./UserLogo";
import { Link } from "react-router-dom";
import MyContext from "../Context/context";
import { useContext } from "react";
const liStyle = "p-2 px-4 cursor-pointer hover:bg-blue-400";

function Navbar() {
  const { globalVariable } = useContext(MyContext);
  if (globalVariable === "user") {
    return (
      <>
        <div className="bg-[#2874f0] text-white px-4 py-2 w-screen">
          <div className="container flex items-center m-auto">
            <Link to="/">
              <div className="pr-4 text-xl font-montserrat">Rewardify.</div>
            </Link>
            <ul className="flex">
              <Link to="/earn">
                <li className={liStyle}>Earn</li>
              </Link>
              <Link to="/transactions">
                <li className={liStyle}>Transactions</li>
              </Link>
              <Link to="/redeem">
                <li className={liStyle}>Redeem</li>
              </Link>
              <Link to="/rules">
                <li className={liStyle}>Rules</li>
              </Link>
              <Link to="/leaderboard">
                <li className={liStyle}>Leaderboard</li>
              </Link>
              <Link to="/stake">
                <li className={liStyle}>Stake</li>
              </Link>
            </ul>
            <div className="ml-auto flex items-center">
              <div className="pr-4">
                <UserLogo name="darshan" />
              </div>
              {/* <button className="bg-white text-blue-500 px-4 py-2 rounded-full">
              Join Us
            </button> */}
              {/* sign out */}
              <div className="bg-white text-blue-500 px-4 py-2 hover:opacity-90 hover:cursor-pointer">
                Sign Out
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-[#2874f0] text-white px-4 py-2 w-screen">
          <div className="container flex items-center m-auto">
            <Link to="/">
              <div className="pr-4 text-xl font-montserrat">Rewardify.</div>
            </Link>
            <ul className="flex">
              <Link to="/rewards">
                <li className={liStyle}>Rewards</li>
              </Link>
              <Link to="/transactions">
                <li className={liStyle}>Transactions</li>
              </Link>
              <Link to="/rules">
                <li className={liStyle}>Rules</li>
              </Link>
            </ul>
            <div className="ml-auto flex items-center">
              <div className="pr-4">
                <UserLogo name="Flipkart" />
              </div>
              {/* <button className="bg-white text-blue-500 px-4 py-2 rounded-full">
              Join Us
            </button> */}
              {/* sign out */}
              <div className="bg-white text-blue-500 px-4 py-2 hover:opacity-90 hover:cursor-pointer">
                Sign Out
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
