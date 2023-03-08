import React, { useEffect, useRef } from 'react'




function Recivedmessage({message}) {
  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behaviour:"smoth"});
  },[message]);

  return (
    <div className=' w-full flex items-start flex-col justify-start '>
    <div className="  mx-4 m-1 pb-2 bg-slate-100 rounded-b-3xl rounded-r-3xl border-2  ">
        <p className="px-3">{message.text} </p>
        <p className="px-3 text-end text-xs opacity-40 leading-1 ">12:00</p>
    </div>


  </div>
  )
}

export default Recivedmessage