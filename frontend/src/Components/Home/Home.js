import React, { useEffect } from "react";
import { useContext, useState } from "react";
import Chart from "../Chart";
import { Progress } from "@chakra-ui/react";
import UserContext from "../../Context/context";
import { getUserBalance } from "../../web3/user";

const ruleStyle = "bg-gray-100 rounded-lg h-40 w-40 p-4";
const ruleStyle2 = "bg-gray-100 rounded-lg h-40 w-40 p-4 text-center";
const numberStyle =
  "font-bold text-blue-500 rounded-full border-2 border-blue-500 h-6 w-6 flex items-center justify-center mb-2";

function Home() {
  const { globalVariable, user } = useContext(UserContext);
  const { balance, setBalance } = useState();

  useEffect(() => {
    (async () => {
      const result = await getUserBalance(user);
      setBalance(result);
      console.log(result);
    })();
  });

  if (globalVariable === "user") {
    return (
      <>
        <div className="bg-white shadow-lg p-4 min-w-[55em]">
          <div className="flex">
            <div>
              <div className="font-bold text-lg">
                SuperToken Balance : {balance}
              </div>
              <div className="text-sm">Valid until: 22-12-2002</div>
            </div>
            <div className="flex font-bold text-[#F7E200] ml-auto items-center">
              <div className="bg-[#2874f0] p-2 ">Gold Member</div>
            </div>
          </div>

          {/* add flipkart poster image */}
          <div className="pt-4">
            <div className="h-64 w-50% bg-blue-500 text-[5em] flex font-montserrat text-white items-center justify-center">
              <div>Rewardify.</div>
            </div>
            <div className="text-blue-500 font-montserrat font-bold text-2xl text-center pt-1">
              Where Loyalty Meets Innovation!
            </div>
          </div>
          {/* rules */}
          <div className="pt-4">
            <div className="font-bold text-lg pt-2">
              Start earning rewards now:{" "}
            </div>
            <div className="pt-2 flex justify-around ">
              <div className={ruleStyle}>
                <div className={numberStyle}>1</div>
                <div>Visit the earn section</div>
              </div>
              <div className={ruleStyle}>
                <div className={numberStyle}>2 </div>
                <div>Choose the tasks you like</div>
              </div>
              <div className={ruleStyle}>
                <div className={numberStyle}>3 </div>
                <div>
                  Get rewarded with SuperTokens for finishing your tasks
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-white shadow-lg p-4 min-w-[55em]">
          <div className="p-4">
            <div className="h-64 w-50% bg-blue-500 text-[5em] flex font-montserrat text-white items-center justify-center">
              <div>Rewardify.</div>
            </div>
            <div className="text-blue-500 font-montserrat font-bold text-2xl text-center pt-1">
              Where Loyalty Meets Innovation!
            </div>
          </div>
          <div className="flex">
            <div>
              <div className="font-bold text-lg pb-2">
                SuperToken Balance : 10000
              </div>
            </div>
          </div>

          {/* threshold */}
          <div className="bg-gray-100 p-2 rounded">
            <div className="font-bold text-lg pt-2">Threshold (64%)</div>
            <Progress hasStripe value={64} />
            <div className="flex items-center">
              <div>0</div>
              <div className="ml-auto">12000</div>
            </div>
          </div>
          <Chart />
          <div className="font-bold text-lg p-2">SuperTokens spent:</div>
          <div className="pt-2 flex justify-around ">
            <div className={ruleStyle2}>
              {/* daily spend */}
              <div className="font-semibold text-3xl">100 </div>
              <div className="font-bold  pt-2">SuperTokens</div>
              <div className="font-bold text-lg pt-2">Today</div>
            </div>
            <div className={ruleStyle2}>
              {/* monthly spend */}
              <div className="font-semibold text-3xl">1000</div>
              <div className="font-bold  pt-2">SuperTokens</div>
              <div className="font-bold text-lg pt-2">Monthly</div>
            </div>
            <div className={ruleStyle2}>
              <div className="font-semibold text-3xl">10000</div>
              <div className="font-bold  pt-2">SuperTokens</div>
              <div className="font-bold text-lg pt-2">Lifetime</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
