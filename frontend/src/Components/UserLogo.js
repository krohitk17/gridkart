import React from "react";
import MyContext from "../Context/context";
import { useContext } from "react";

function UserLogo({ name }) {
  const { globalVariable } = useContext(MyContext);

  if (globalVariable === "user") {
    return (
      <>
        <div className="flex items-center">
          <div className="pr-2 capitalize">{name}</div>
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <img
              src="https://avatars.githubusercontent.com/u/68650149?v=4"
              alt="user"
              className="w-8 h-8"
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center">
          <div className="pr-2 capitalize">{name}</div>
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png"
              alt="user"
              className="w-8 h-8"
            />
          </div>
        </div>
      </>
    );
  }
}

export default UserLogo;
