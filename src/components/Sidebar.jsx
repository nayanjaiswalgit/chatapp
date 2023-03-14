import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

function Sidebar(props) {
  

  return (
    
    <div className=' relative lg:w-[45%] w-full  md:w-[50%] bg-violet-600 h-full  '>
      <Navbar > </Navbar>
      <Search></Search>
      <Chats  ></Chats>
      </div>
  )
}

export default Sidebar