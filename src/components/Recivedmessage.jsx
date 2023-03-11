import React, { useEffect, useRef } from 'react'




function Recivedmessage({message}) {
  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behaviour:"smoth"});
  },[message]);


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
  
  
  















  return (
    <div className='   flex items-start w-[50%]  justify-start '>
    <div className="  mx-4 m-1 pb-2 bg-slate-100 rounded-b-3xl rounded-r-3xl border-2  ">
        <p  className="px-3">{message.text} </p>
        <p className="px-3 text-end text-xs opacity-40 leading-1 ">{time}</p>
    </div>
      
    

  </div>
  )
}

export default Recivedmessage