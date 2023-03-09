import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";
import { db } from "../firebase";
import Recivedmessage from "./Recivedmessage";
import Sendmessage from "./Sendmessage";
import NoChat from "../img/NoChat.png";
import ClipLoader from "react-spinners/ClipLoader";

function Message() {

  const {currentUser} = useContext(AuthContext);
  const {data}=useContext(ChatContext);
  const [messages, SetMesaages] = useState([]);
  const [loading , setLoading] = useState(false);   
  function format(inputDate) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}/${month}/${year}`;
  }

  const Timestamp = (value) => {


    try {
      const chattime = value ? value.seconds*1000 : 0 ;
      
      var d1 = new Date(chattime);
      var d2 = new Date();
      
     
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      
      if(d1.getMonth() === d2.getMonth()) {
        if(d2.getDate() === d1.getDate()){
    
    
         return "Today"
    
        }
    
        
        else if((d2.getDate() - d1.getDate() === 1 )){
          return  "Yesterday" 
        }
    
        else if((d2.getDate() - d1.getDate() < 7 )){
          return days[d1.getDay()]
        }
        else {
          
         return format(d1)
        }
      }
    }
        
      catch(err){
        console.log(err);
      }
        
       
      }
  
  
  

  
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


 let dateupdate;
 const show = !messages ? (<div  className=" absolute  bg-white w-full h-[100%] flex justify-center items-center flex-col ">
  <img src={NoChat} alt="NoChat" className="w-40"  />
  <h1 className=" text-center text-violet-900 text-2xl">No Conversation yet</h1>
 </div>):
 
 ( messages.map((m)=>(
  (m.senderId === currentUser.uid)?( dateupdate === Timestamp(m.date) ?  <Sendmessage   message={m} key={m.id}>{dateupdate=Timestamp(m.date)}</Sendmessage> : <><div key={m.id} className="text-s text-center"><span className="bg-slate-200 p-2 rounded-lg">{dateupdate=Timestamp(m.date)}</span></div><Sendmessage   message={m} key={m.id}/></> 
 ):(dateupdate === Timestamp(m.date) ? <Recivedmessage message={m} key={m.id}>{dateupdate=Timestamp(m.date)}</Recivedmessage> :<> <div key={m.id} className="text-s text-center"><span className="bg-slate-200 p-2 rounded-lg">{dateupdate=Timestamp(m.date)}</span></div><Recivedmessage message={m} key={m.id}/></>) ),()=>{dateupdate='' }
)); 


    if(Object.keys( data.user).length === 0){
    return (<div className="   w-full h-[full] lg:mx-0 md:mx-0   bg-white">
    <div className=' relative h-[100%] pb-4 w-full bg-[url(".././src/img/Welcome.gif")] bg-cover overflow-auto    scrollbar-thin scrollbar-thumb-violet-800  scrollbar-track-violet-100 '>

    </div> 
    
   </div>)
  }


  
  return (
    <div ref={ref} className=' h-[80%] lg:h-[85%] pb-1  w-full bg-[url(".././src/img/chat.png")] bg-cover overflow-auto    scrollbar-thin scrollbar-thumb-violet-800  scrollbar-track-violet-100 '>

        
      {show}
      
      </div>
  );
}

export default Message;
