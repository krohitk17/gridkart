import React from "react";

const ruleStyleEnable =
  "bg-gray-100 rounded-lg h-44 w-44 p-4 m-4 hover:bg-gray-300  font-semibold transition duration-500 ease-in-out transform  hover:scale-110 hover:cursor-pointer";

function RedeemItem({ img, name, cost, onClick }) {
  return (
    <>
      <div className={ruleStyleEnable} onClick={onClick}>
        <div className="flex justify-center">
          <img className="h-20 w-20" src={img} alt="#"></img>
        </div>
        <div>
          <div className="font-semibold text pt-2">{name}</div>
          <div className="text-sm">{cost} SuperTokens</div>
        </div>
      </div>
    </>
  );
}

export default RedeemItem;
