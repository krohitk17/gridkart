import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

function Stake() {
  return (
    <>
      <div className="bg-white shadow-lg p-4 w-[55em]">
        <div className="rounded-xl border-2 border-gray-500 px-2 py-3 mb-2">
          <div className="flex items-center">
            <div>
              <div className="text-sm">SuperTokens Earned</div>
              <div className="font-semibold text-lg">102 SuperTokens</div>
            </div>
            <div className="ml-auto">
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full ml-auto">
                Collect
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-xl border-2 border-gray-500 px-2 py-3 bg-gray-500 text-white">
          <div className="flex items-center">
            <div>
              <div className="text-sm">SuperTokens Staked</div>
              <div className="font-semibold text-lg">1000 SuperTokens</div>
            </div>
            <div className="ml-auto flex">
              {/* plus and minus button */}
              <div className="pr-2 hover:opacity-70">
                <AiFillPlusCircle size={30} />
              </div>
              <div className="hover:opacity-70">
                <AiFillMinusCircle size={30} />
              </div>
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="text-lg font-bold text-center">Staking Info</div>
          <div className="flex">
            <div className="basis-1/2 rounded-xl border-2 border-black h-20 m-2">
              <div className="text-center pt-2">APR</div>
              <div className="text-center text-green-500 font-bold text-lg">
                15%
              </div>
            </div>
            <div className="basis-1/2 rounded-xl border-2 border-black h-20 m-2">
              <div className="text-center pt-2">Total Staked</div>
              <div className="text-center font-bold text-lg">
                1000 SuperTokens
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="basis-1/2 rounded-xl border-2 border-black h-20 m-2">
              <div className="text-center pt-2">Ends In:</div>
              <div className="text-center text-green-500 font-bold text-lg">
                100 Days
              </div>
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
