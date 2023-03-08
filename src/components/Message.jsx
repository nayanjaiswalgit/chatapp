import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";
import { db } from "../firebase";
import Recivedmessage from "./Recivedmessage";
import Sendmessage from "./Sendmessage";



function Message() {

  const {currentUser} = useContext(AuthContext);
  const {data}=useContext(ChatContext);
  const [messages, SetMesaages] = useState([]);
  
  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && SetMesaages(doc.data().message)
    })
    return ()=>{
      unSub();
    }

 },[data.chatId] )
  console.log("messages " + messages)
  
  const show = messages.map((m)=>(
   (m.senderId === currentUser.uid)?( <Sendmessage message={m} key={m.id}/>
  ):( <Recivedmessage message={m} key={m.id}/>)
  

 

))


  return (
    <div className=' h-[80%] pb-4 w-full bg-[url(".././src/img/chat.png")] bg-cover overflow-auto    scrollbar-thin scrollbar-thumb-violet-800  scrollbar-track-violet-100 '>
    
      {show}
      
      </div>
  );
}

export default Message;
