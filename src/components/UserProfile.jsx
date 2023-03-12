


import { BsTelephoneFill } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";

function UserProfile({userdata,setshowuser}) {

    









  return (
    <div className=" flex-wrap italic  Tilefont  text-Black p-3  mx-10 absolute w-[75%] top-32  lg:top-16 h-96 z-10 rounded-2xl flex flex-col justify-center items-center border-3 bg-slate-200 ">
          <RiCloseLine
          onClick={()=>setshowuser(false)}
          className="   absolute top-0 right-2 bg-slate-600 bg-opacity-20 text-2xl  text-white rounded-full my-2 "
        />
        <img className='w-[50%] lg:w-[70%] rounded-lg' src={userdata.photoURL} />

      <div className=' md:text-xl flex flex-col  m-3 '>
        <p className='py-1  mt-2'>{userdata.displayName} </p>
      
      <p className='text-sm   text-green-700 '>   Phone</p>
      <p  className='  text-base font-lighter py-1 items-center mt-1 flex gap-2'> <BsTelephoneFill className='text-green-600' />   { userdata.Phone} </p>
      <p className='text-sm  text-green-700 '>  About</p>
      <p  className=' py-1  mt-2    lg:text-base lg:font-lighter'>{userdata.about} </p>
      <p className='text-sm   text-green-700 '>   Bio</p>
      <p  className='   py-1 lg:text-base lg:font-lighter mt-1'>{userdata.Bio} </p>
      
      </div>
      
    </div>
  )
}



export default UserProfile
