import React, { useEffect, useState } from "react";
import UserContext from "./context";

import { getUserBalance, getContractBalance } from "../Routes/user";

const UserContextProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState("user");
  const [user, setUser] = useState("64e245016b0c0a7bb062fe94");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    console.log(user);
    if (globalVariable === "user") {
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
