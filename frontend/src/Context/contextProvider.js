import React, { useEffect, useState } from "react";
import UserContext from "./context";

import { getUserBalance, getContractBalance } from "../Routes/user";

const UserContextProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState("admin");
  const [user, setUser] = useState("64e244fb6b0c0a7bb062fe92");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    console.log(user);
    if (globalVariable === "user" || globalVariable === "login") {
      console.log("herel");
      getUserBalance(user).then((balance) => {
        setBalance(balance);
      });
    } else {
      getContractBalance().then((balance) => {
        setBalance(balance);
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        globalVariable,
        setGlobalVariable,
        user,
        setUser,
        balance,
        setBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
