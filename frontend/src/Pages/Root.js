import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Root() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen w-screen bg-slate-200 pb-10">
        <div className="pt-4 flex justify-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Root;
