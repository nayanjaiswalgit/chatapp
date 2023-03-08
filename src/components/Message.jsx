import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";
import { db } from "../firebase";
import Recivedmessage from "./Recivedmessage";
import Sendmessage from "./Sendmessage";
import NoChat from "../img/NoChat.png";


function Message() {

  const {currentUser} = useContext(AuthContext);
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
   ref.current?.scrollIntoView({behaviour:"smoth"});
 },[messages]);



 const show = !messages ? (<div className=" absolute  bg-white w-full h-[100%] flex justify-center items-center flex-col ">
  <img src={NoChat} alt="NoChat" className="w-40" />
  <h1 className=" text-center text-violet-900 text-2xl">No Conversation yet</h1>
 

 </div>): ( messages.map((m)=>(
  (m.senderId === currentUser.uid)?( <Sendmessage message={m} key={m.id}/>
 ):( <Recivedmessage  message={m} key={m.id}/>)
))); 


    if(Object.keys( data.user).length === 0){
    return (<div className="   w-full h-full lg:mx-0 md:mx-0   bg-white">
    <div className=' h-[100%] pb-4 w-full bg-[url(".././src/img/Welcome.gif")] bg-cover overflow-auto    scrollbar-thin scrollbar-thumb-violet-800  scrollbar-track-violet-100 '>
   
    </div> 
    
   </div>)
  }
  return (
    <div  className='relative h-[80%] lg:h-[85%] pb-1  w-full bg-[url(".././src/img/chat.png")] bg-cover overflow-auto    scrollbar-thin scrollbar-thumb-violet-800  scrollbar-track-violet-100 '>
    
      {show}
      
      </div>
  );
}

export default Message;
