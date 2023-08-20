import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContextProvider from "./Context/contextProvider";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </UserContextProvider>
);
