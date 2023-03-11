import React, { useContext, useEffect, useState } from 'react'

import { GoPrimitiveDot } from "react-icons/go";
import { IoMdCall } from "react-icons/io";
import { IoIosVideocam } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { ChatContext } from '../context/ChatContest';
import { doc, onSnapshot } from 'firebase/firestore';
import Timestamp from './Timestamp';
import { db } from '../firebase';
function Mainnav(props) {
const [onstatus, setonstatus] = useState(false);
  const  stateChangeHandler = ()=>{
    if(!props.showchat){
    props.setshowchat(true);
  }
}

  const {data} = useContext(ChatContext);

 
  

  const fatchdata = () => {
 
     
    
    const unsub = onSnapshot(doc(db, "lastseen", data.user.uid), (doc) => {
      setonstatus(doc.data());
    });

   







    return () => {
      unsub();

    };
        
  };


  useEffect(() => {

    try {
      fatchdata();

 
    } catch (err) {
     
      console.log("error" + err);
    }
  }, [data.uid]);











  if(Object.keys( data.user).length === 0){
    return (<div className=" w-full lg:mx-0 md:mx-0 ">
       <div className="lg:h-14 h-16  w-full text-white  border-l-2 rounded-md  lg:rounded-none md:rounded-none border-violet-700 bg-violet-800 flex justify-around  lg:pl-5 lg:pr-5 items-center relative text-4xl ">Welcome Back</div>
    </div>)
  }

  return (
    <div  className=" w-full lg:mx-0 md:mx-0  ">
      <div className="  lg:hidden p-2 bg-[url('.././src/img/chat.gif')] bg-cover bg-white ">
     { !props.showchat && <BiArrowBack className="lg:invisible md:invisible text-blue-500 absolute text-4xl left-5 top-1 bg-white rounded-full"  onClick={stateChangeHandler}/>}
        <p className="text-center text-2xl font-bold">Chit Chat</p>
      </div>
      <div className="lg:h-14 h-16   w-full text-white border-l-2 rounded-md  lg:rounded-none md:rounded-none border-violet-700 bg-violet-800 flex justify-around lg:justify-between lg:pl-5 lg:pr-5 items-center relative">
        <div className=" flex items-center">
          <img
            src={data.user.photoURL}
            alt="profilephoto"
            className="w-12 lg:w-10  rounded-full"
          />
        </div>
        <div className="-mt-1">
          <h2 className="text-xl leading-7 text-white font-Tilefont ">{data.user.displayName}</h2>
         {onstatus.online ? <div className="flex mx-3">
          <GoPrimitiveDot className="text-green-500" />
           
            <p className="text-white opacity-90  text-xs font-light text-center">online
            </p>
          </div> :
          <div className="flex">
          
           
            <p className="text-white opacity-90 mx-3 text-xs font-light text-center">Lastseen - {Timestamp(onstatus.LastSeen)}
            </p>
          </div>}
        </div>
        <div className="  flex group  md:flex justify-between relative md:gap-5 lg:gap-5 items-center">
          <p className='absolute invisible group-hover:visible text-xs left-0 -top-5  opacity-50 '>Comming Soon..</p> 
        <IoMdCall  className='lg:text-xl text-2xl'/>
        <IoIosVideocam  className='lg:text-xl text-2xl invisible md:visible lg:visible'/>
        <BsThreeDots  className='lg:text-xl text-2xl'/>
        </div>
        
      </div>
      
    </div>
  )
}

export default Mainnav