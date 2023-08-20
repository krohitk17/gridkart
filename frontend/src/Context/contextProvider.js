import React, { useState } from "react";
import UserContext from "./context";

const UserContextProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState("user");
  const [user, setUser] = useState(
    "0xFA370fE5fFfCfcEc3db78587db7E62944AD883dE"
  );

  return (
    <UserContext.Provider
      value={{ globalVariable, setGlobalVariable, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
