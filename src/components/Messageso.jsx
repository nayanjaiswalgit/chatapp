import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";

const Messageso = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  
  var date = new Date(message.date*1000);
 var time =  date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute:'2-digit'
  });
 

  const Timestamp = (date) => {


    try {
      const chattime = date ? date.seconds*1000 : 0 ;
      
      var d1 = new Date(chattime);
      var d2 = new Date();
      
     
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      
      if(d1.getMonth() === d2.getMonth()) {
        if(d2.getDate() === d1.getDate()){
    
    
         return 
    
        }
    
        
        else if((d2.getDate() - d1.getDate() === 1 )){
          return  "Yesterday" 
        }
    
        else if((d2.getDate() - d1.getDate() < 7 )){
          return days[d1.getDay()]
        }
        else {
          
          return d1.toLocaleDateString();
        }
      }
    }
        
      catch(err){
        console.log(err);
      }
        
       
      }
      const stylechat =  message.senderId === currentUser.uid 

  return (
   
    <div
      
      className={`flex ${ stylechat ?  'items-end':'items-start' } flex-col  justify-start`}
      
    >
       

      <div className={`overflow-hidden mx-4 m-1 pb-2 max-w-[50%] pt-2 bg-slate-100 ${stylechat ? 'rounded-t-2xl rounded-l-3xl':' rounded-b-3xl rounded-r-3xl' } border-2`} >
      {message.img && <img src={message.img} alt="" className=" w-full h-auto rounded-2xl p-2 "/>}
      <p className="px-3 ">{message.text}</p>
      <p className="px-3 text-end text-xs opacity-40 leading-1 ">{time}</p>
      </div>
     
    </div>
  );
};

export default Messageso;