import React, { useState } from 'react'
import { FcSearch } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';

function Search() {
const [show,setshow] = useState(true)

  const changeHandler = ()=>{
      setshow((prevstate)=> {return !prevstate}) 
      console.log(show);
  }
  return (
    <div className='w-full m-auto p-4 relative  '>
      <input type='text' className='w-full px-4 py-1 border-b-4  border-blue-200 m-auto rounded placeholder:italic  ' placeholder='Search or start a new chat  '/>
      <button className='absolute right-7 top-5  ' onClick={changeHandler}> 
    
      { show && <FcSearch className='text-2xl'/> }
       { !show && <RxCross2 className='text-2xl'/>}

                 </button>
    </div>
  )
}

export default Search