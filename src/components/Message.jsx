import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";

import { ChatContext } from "../context/ChatContest";
import { db } from "../firebase";

import NoChat from "../img/NoChat.png";

import Messageso from "./Messageso";
import {Timestamp2} from "./Timestamp";

function Message() {


  const {data}=useContext(ChatContext);
  const [messages, SetMesaages] = useState([]);


  
  
  

  
  const fetchchat = () => {
    const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && SetMesaages(doc.data().message)
      
    })
    return ()=>{
      unSub();
    }

  }
  useEffect(()=>{
  try{
    fetchchat();
  }
  catch (err){
    console.log("error" , err);
  }
 },[data.chatId] )

 const ref = useRef();
 useEffect(()=>{
  
   ref.current?.scrollTo({
    top: 10000,
    behavior: "smooth",
  });
 },[messages]);


 let dateupdate ;
 const show = !messages ? (<div  className=" absolute  bg-white w-full h-[100%] flex justify-center items-center flex-col ">
  <img src={NoChat} alt="NoChat" className="w-40"  />
  <h1 className=" text-center text-violet-900 text-2xl">No Conversation yet</h1>
 </div>):
 
 (  messages.map((m) => (
Timestamp2(m.date) === dateupdate ? <Messageso message={m} key={m.id} /> :
<><div className="w-full text-center ">
  <span className="bg-slate-300 border-2 border-white px-3   py-1 rounded-full">{Timestamp2(m.date)}</span> </div><Messageso message={m} key={m.id} >{dateupdate=Timestamp2(m.date)} </Messageso></>

))); 


    if(Object.keys( data.user).length === 0){
    return (<div className="   w-full h-full lg:mx-0 md:mx-0   bg-white">
    <div className=' relative h-[100%] pb-4 w-full bg-[url(".././src/img/Welcome.gif")] bg-cover overflow-auto    scrollbar-thin scrollbar-thumb-violet-800  scrollbar-track-violet-100 '>

    </div> 
    
   </div>)
  }


  
  return (
    <div ref={ref} className=' relative h-full pb-2 w-full bg-[url(".././src/img/chat.png")] bg-cover overflow-auto    scrollbar-thin scrollbar-thumb-violet-800  scrollbar-track-violet-100  lg:rounded-none md:rounded-none rounded'>
      
      
      {show}
    
        
     
      </div>
  );
}

export default Message;
