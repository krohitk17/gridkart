import React from "react";
import MyContext from "../Context/context";
import { useContext } from "react";
import { redirect } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { BiHide } from "react-icons/bi";

const formItemsStyle = "pb-4 w-[300px] text-black m-auto";

function Login() {
  const { setGlobalVariable } = useContext(MyContext);

  const handleClick = () => {
    setTimeout(() => {
      setGlobalVariable("user");
    }, 1000);
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-[#f3f5f9]">
        <div className="flex-col text-center justify-content-center">
          <div className="h-30 w-50% bg-blue-500 text-[5em]  font-montserrat text-white items-center justify-center mb-4">
            <div>Rewardify.</div>
          </div>
          <div className={formItemsStyle}>
            <Input type="email" placeholder="Email" />
          </div>
          <div className={formItemsStyle}>
            <InputGroup size="md">
              <Input placeholder="Enter password" type="password" />
              <InputRightElement>
                <Button h="1.75rem" size="sm">
                  <BiHide />
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
          <div className={formItemsStyle}>
            <Button type="submit" colorScheme="blue" onClick={handleClick}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
