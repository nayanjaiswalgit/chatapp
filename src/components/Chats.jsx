import React from "react";
import user from "../img/user.jpg";

function Chats() {
  return (
    <div className=" overflow-y-auto h-[100%] border-r-4 border-violet-600 p-1">
    
      <div className="px-4  py-2 my-2 w-full  h-18 relative flex gap-3 border-b-2 border-violet-500 hover:bg-violet-700 hover:rounded-lg">
        <div className="flex items-center">
          <img src={user} alt="profilephoto" className="w-12 rounded-full" />
        </div>
        <div className="-my-1">
          <span className="text-xl  text-white font-Tilefont ">Nayan</span>
          <p className="text-white opacity-80 text-xs font-light leading-7	">
            Hello
          </p>
          <div className=" absolute  top-2   right-3 bg-green-500 w-5 h-5 rounded-full flex items-center justify-center drop-shadow-lg">
            <p className="font-Tilefont text-white  text-sm text-bolder drop-shadow-lg">5</p>
            
          </div>
          <p className="absolute right-3 bottom-2 text-white  opacity-90 text-xs text-bolder">00:12</p>
        </div>
      </div>

      <div className="px-4  py-2 my-2 w-full  h-18 relative flex gap-3 border-b-2 border-violet-500 hover:bg-violet-700 hover:rounded-lg">
        <div className="flex items-center">
          <img src={user} alt="profilephoto" className="w-12 rounded-full" />
        </div>
        <div >
          <span className="text-xl  text-white font-Tilefont">Nayan</span>
          <p className="text-white opacity-80 text-xs font-light leading-4	">
            Hello
          </p>
          <div className=" absolute  top-2   right-3 bg-green-500 w-5 h-5 rounded-full flex items-center justify-center drop-shadow-lg">
            <p className="font-Tilefont text-white  text-sm text-bolder drop-shadow-lg">5</p>
            
          </div>
          <p className="absolute right-3 bottom-2 text-white  opacity-90 text-xs text-bolder">00:12</p>
        </div>
      </div>


    
    </div>
  );
}

export default Chats;
