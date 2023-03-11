import React from 'react'
import photo from '../img/anjali.jpg'
import { IoIosSend } from 'react-icons/io'
import { BsEmojiSmile } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';

function Modal() {
  return (
    <div className=' w-[30%] h-[30%] '>
     
        <div className='relative' >
        <RiCloseLine  className='  absolute top-0 left-2 bg-slate-600 bg-opacity-20 text-2xl  text-white rounded-full my-2 '/>
            <img src={photo} alt="" className='rounded-lg'  />
        </div>
       <form action=""  className="relative">
       <input
          type="text"
          className=" w-full  px-4 py-1 border-b-2  border-blue-200 my-1 rounded-3xl    placeholder:italic  "
          placeholder="Add a caption...  " />
       <div className='flex justify-between px-2 items-center'>
       <p className="bg-slate-900 bg-opacity-30 rounded-3xl px-3 text-white">Name</p>  
        <button   className="  w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-green-500 hover:scale-105 text-white flex items-center justify-center">
        <IoIosSend className="lg:text-xl text-2xl " />
        </button>
       </div>
       </form>
    
    
      </div>
     
  )
}

export default Modal