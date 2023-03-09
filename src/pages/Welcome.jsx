import React from "react";

import { NavLink } from "react-router-dom";
import logo from "../img/logo.png"

const Welcome = () => {
  return (
    <div className=" font-bold border p-8  rounded-md   flex flex-col justify-around bg-white opacity-95 drop-shadow-2xl">
      <h1 className="text-center text-2xl text-violet-800">Welcome To Chit Chat</h1>
      <img src={logo} alt="logo" width='150px' className="inline-block self-center" />
      <div className=" flex justify-around items-center">
      <NavLink className="border p-2 w-28 text-white text-center bg-violet-500" to={`/login`}>Login</NavLink>
      <NavLink className="border p-2  w-28 text-white text-center  bg-violet-500" to={`/register`}>Register</NavLink>
      </div>
    </div>
  );
};

export default Welcome;
