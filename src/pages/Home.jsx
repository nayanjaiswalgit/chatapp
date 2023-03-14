import React, { useContext} from 'react'

import { Sidebar, Chat } from '../components'
import { ChatContext } from '../context/ChatContest';
function Home() {
  const {showBackButton }=useContext(ChatContext);

 

  return (
    <>
   
    <div className=' hidden lg:flex md:flex lg:w-[75%]  md:h-[90%] md:w-[90%]  lg:h-[80%] border-2 border-violet-900 rounded overflow-hidden  '>
      <Sidebar ></Sidebar>
      <Chat ></Chat>
    </div>
     <div className='  relative flex  lg:hidden md:hidden w-full h-[99%]  overflow-hidden rounded-md m-1 my-4 '>
 {   showBackButton ?  <Chat /> :  <Sidebar /> }


 {/*hidden lg:block md:block*/ }
     </div>
     </>

  )
}


export default Home