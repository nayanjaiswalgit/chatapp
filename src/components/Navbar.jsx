import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import {auth, db} from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore';
function Navbar() {
  const {currentUser} = useContext(AuthContext);

  const singouthandler =  async () => {

  try{
    updateDoc(doc(db, "lastseen", currentUser.uid), {
      
      LastSeen : new Date(),
      online : false,
    });
  }
  catch(error){
    console.log(error);
  }
  signOut(auth)
  }
 
  return (
    <div className="h-12  w-full text-white  bg-violet-800 flex justify-around items-center relative" >
      <span className=' absolute -top-14 -left-5 text-slate-100 text-bold text-4xl' >Chit Chat</span>
      <div className='flex items-center justify-between w-[90%] gap-2'>
        <img src={currentUser.photoURL} alt="profile" className='w-7 rounded-full'  />
        <span className='text-xl'>   Chats</span>
       
        <button onClick={singouthandler}className='rounded-md drop-shadow-sm  bg-violet-900 hover:bg-slate-900 p-2'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar