import React, { useContext } from 'react'

import user from "../img/user.jpg";
import { GoPrimitiveDot } from "react-icons/go";
import { IoMdCall } from "react-icons/io";
import { IoIosVideocam } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { ChatContext } from '../context/ChatContest';
function Mainnav() {

  const {data} = useContext(ChatContext);
  console.log(data);
  return (
    <div className="   w-full lg:mx-0 md:mx-0  ">
      <div className="lg:hidden p-2 bg-[url('.././src/img/chat.gif')] bg-cover bg-white ">
        <p className="text-center text-2xl font-bold">Chit Chat</p>
      </div>
      <div className="lg:h-14 h-16   w-full text-white border-l-2 rounded-md  lg:rounded-none md:rounded-none border-violet-700 bg-violet-800 flex justify-around lg:justify-between lg:pl-5 lg:pr-5 items-center relative">
        <div className=" flex items-center">
          <img
            src={data.user.photoURL}
            alt="profilephoto"
            className="w-12 lg:w-10  rounded-full"
          />
        </div>
        <div className="-mt-1">
          <h2 className="text-xl leading-7 text-white font-Tilefont ">{data.user.displayName}</h2>
          <div className="flex">
            <GoPrimitiveDot className="text-green-500" />
            <p className="text-white opacity-90 text-xs font-light text-center">Online
            </p>
          </div>
        </div>
        <div className="  flex justify-between   gap-5 items-center"> 
        <IoMdCall  className='lg:text-xl text-2xl'/>
        <IoIosVideocam  className='lg:text-xl text-2xl'/>
        <BsThreeDots  className='lg:text-xl text-2xl'/>
        </div>
      </div>
    </div>
  )
}

export default Mainnav