import React, { useEffect } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import UserContext from "../Context/context";
import { useState } from "react";
import { getUser, stakeTokens, unstakeTokens } from "../Routes/user";

function Stake() {
  const { user } = React.useContext(UserContext);
  const { balance, setBalance } = React.useContext(UserContext);
  const [stake, setStake] = useState(0);
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    getUser(user).then((userData) => {
      setRoi(userData.stake);
    });
  }, []);

  const stakeHandler = (e) => {
    e.preventDefault();
    stakeTokens(user, stake).then((res) => {
      console.log(res);
      setRoi(parseInt(stake));
      setBalance(balance - parseInt(stake));
    });
  };

  const unstakeHandler = (e) => {
    e.preventDefault();
    unstakeTokens(user).then((res) => {
      console.log(res);
      setRoi(0);
      setBalance(balance + parseInt(stake));
    });
  };

  return (
    <>
      <div className="bg-white shadow-lg p-4 w-[55em]">
        <div className="rounded-xl border-2 border-gray-500 px-2 py-3 bg-gray-500 text-white">
          <div className="flex items-center">
            <div>
              <div className="text-sm">SuperTokens Staked</div>
              <div className="font-semibold text-lg">{stake} SuperTokens</div>
            </div>
            <div className="ml-auto flex items-center">
              {/* plus and minus button */}
              <div className="pr-2 hover:opacity-70">
                <AiFillPlusCircle
                  size={30}
                  onClick={() => {
                    setStake(stake + 100 < balance ? stake + 100 : stake);
                  }}
                />
              </div>
              <div className="hover:opacity-70">
                <AiFillMinusCircle
                  size={30}
                  onClick={() => {
                    setStake(stake - 100 > 0 ? stake - 100 : 0);
                  }}
                />
              </div>
              <button
                className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full ml-2"
                type="submit"
                onClick={stakeHandler}
              >
                Stake
              </button>
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="text-lg font-bold text-center">Staking Info</div>
          <div className="flex">
            <div className="basis-1/2 rounded-xl border-2 border-black h-20 m-2">
              <div className="text-center pt-2">Profit Calculation</div>
              <div className="text-center text-green-500 font-bold text-lg">
                1 Token Per 100 Staked Tokens Per Day
              </div>
            </div>
            <div className="basis-1/2 rounded-xl border-2 border-black h-20 m-2">
              <div className="text-center pt-2">Total Staked</div>
              <div className="text-center font-bold text-lg">
                {roi} SuperTokens
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="basis-1/2 rounded-xl border-2 border-black flex justify-center items-center m-2">
              <button
                className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
                type="submit"
                onClick={unstakeHandler}
              >
                UnStake
              </button>
            </div>
            <div className="basis-1/2 rounded-xl border-2 border-black h-20 m-2 flex justify-center items-center bg-black text-white">
              <div className="text-center font-bold text-lg">
                ROI <BiMoney size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stake;
