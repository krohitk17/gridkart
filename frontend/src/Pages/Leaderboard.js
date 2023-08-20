import React from "react";
import LeaderboardItem from "../Components/LeaderboardItem";

function Leaderboard() {
  return (
    <>
      <div className="bg-white shadow-lg p-4 min-w-[55em]">
        <div className="flex justify-evenly h-[20em] items-end mt-4">
          {/* top 3 */}
          <div>
            <div class="w-40 h-[11em] bg-gradient-to-b from-[#D7D7D7] to-transparent text-white flex  justify-center p-4">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="#"
                //   scale image to edge of div
                className="h-20 w-20 object-cover rounded-full -translate-y-14 "
              ></img>
            </div>
            <div className="text-center font-bold">2. Emily Johnson</div>
            {/* number of tokens */}
            <div className="text-center font-bold text-blue-500">
              5500 SuperTokens
            </div>
          </div>
          <div>
            <div class="w-40 h-[15em] bg-gradient-to-b from-[#C9B037] to-transparent text-white flex justify-center p-4">
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="#"
                //   scale image to edge of div
                className="h-20 w-20 object-cover rounded-full -translate-y-14"
              ></img>
            </div>
            <div>
              <div className="text-center font-bold">1. Michael Williams</div>
              {/* number of tokes */}
              <div className="text-center font-bold text-blue-500">
                19000 SuperTokens
              </div>
            </div>
          </div>
          <div>
            <div class="w-40 h-[8em] bg-gradient-to-b from-[#AD8A56] to-transparent text-white flex  justify-center p-4">
              <img
                src="https://randomuser.me/api/portraits/women/3.jpg"
                alt="#"
                //   scale image to edge of div
                className="h-20 w-20 object-cover rounded-full -translate-y-14"
              ></img>
            </div>
            <div>
              <div className="text-center font-bold">3. Sophia Martinez</div>
              {/* number of tokes */}
              <div className="text-center font-bold text-blue-500">
                2500 SuperTokens
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[4em]">
          <LeaderboardItem position="4" name="Matthew Robinson" token="2000" />
          <LeaderboardItem position="5" name="Emily Johnson" token="1500" />
          <LeaderboardItem position="6" name="Sarah Martinez" token="1000" />
          <LeaderboardItem position="7" name="Christopher Davis" token="500" />
          <LeaderboardItem position="8" name="Jessica Anderson" token="250" />
          <LeaderboardItem position="9" name="Daniel Thompson" token="100" />
          <LeaderboardItem position="10" name="Olivia Garcia" token="50" />
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
