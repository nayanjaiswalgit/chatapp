import React from 'react'

function Sendmessage({message}) {
console.log( message );
  return (
    <div className=' flex items-end flex-col justify-start mr-2 '>
    <div className=" px-3  mx-3 m-1 pb-2 bg-slate-100 rounded-t-2xl rounded-l-3xl border-2  ">
        <p className="" >{message.text} </p>
        <p className="text-end text-xs opacity-40 leading-3 ">12:00</p>
    </div>

   
   


  </div>
  )
}

export default Sendmessage