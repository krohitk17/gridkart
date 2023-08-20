import React from "react";

const itemStyle =
  "bg-gray-100 rounded-lg h-30 w-full p-4 hover:bg-gray-300 mb-2 font-semibold";

function LeaderboardItem({ position, name, token }) {
  return (
    <div className={itemStyle}>
      <div className="flex ">
        {/* name */}
        <div className="w-1/2">
          {position}. {name}
        </div>
        {/* number of tokens */}
        <div className="w-1/2 text-right text-blue-500">
          {token} SuperTokens
        </div>
      </div>
    </div>
  );
}

export default LeaderboardItem;
