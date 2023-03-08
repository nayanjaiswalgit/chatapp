import React from 'react'

import { Sidebar, Chat } from '../components'
function Home(props) {
  return (
    <>
    <div className=' hidden lg:flex md:flex lg:w-[75%]  md:h-[90%] md:w-[90%]  lg:h-[80%] border-2 border-violet-900 rounded overflow-hidden  '>
      <Sidebar></Sidebar>
      <Chat  ></Chat>
    </div>
     <div className=' flex  lg:hidden md:hidden w-full h-full  overflow-hidden  '>
     <Sidebar></Sidebar>
 {/*hidden lg:block md:block*/ }
     </div>
     </>

  )
}


export default Home
