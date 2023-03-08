import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";
import { db } from "../firebase";


function Chats() {
  const [chats, setChats] = useState([]);
  
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

 
  const fatchdata = ()=>{
    const unsub =   onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
     
      setChats(doc.data());
 
   });
   return ()=>{
     unsub();
   };
  }

  useEffect(  ()=>{
    try{
      fatchdata();
    }
    catch(err) {
console.log("error"+ err);
    }

  },[currentUser.uid])

const handleSelect = (extaindchat) => {
  dispatch({type:"CHANGE_USER", payload:extaindchat})

  
}

  return (
   
    <div className=" overflow-y-auto h-[100%] border-r-4 border-violet-600 p-1">

      {     Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date ).map((chat)=>(
      <div  key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} className="px-4  py-2 my-2 w-full  h-18 relative flex gap-3 border-b-2 border-violet-500 hover:bg-violet-700 hover:rounded-lg">
        <div className="flex items-center">
          <img src={chat[1].userInfo.photoURL} alt="profilephoto" className="w-12 rounded-full" />
        </div>
        <div className="-my-1">
          <span className="  text-white ">{chat[1].userInfo.displayName}</span>
          <p className="text-white opacity-80 text-xs font-light leading-7	">
           { chat[1].lastMesaage?.text}
          </p>
          <div className=" absolute  top-2   right-3 bg-green-500 w-5 h-5 rounded-full flex items-center justify-center drop-shadow-lg">
            <p className="font-Tilefont text-white  text-sm text-bolder drop-shadow-lg">5</p>
            
          </div>
          <p className="absolute right-3 bottom-2 text-white  opacity-90 text-xs text-bolder">00:12</p>
        </div>
      </div>))

}


    
    </div>
  );
}

export default Chats;
