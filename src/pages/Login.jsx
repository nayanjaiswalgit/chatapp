import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import google from '.././img/Google.png'
import {  GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import { ClipLoader } from 'react-spinners';
let showerror = (<p className="text-red-500 text-center rounded-lg bg-slate-100 ">
Sign Up First</p>)
function Login() {
  const provider = new GoogleAuthProvider();
  const [err, setErr] = useState(false);
  const [loading , setLoading] = useState(false);   
  const navigate = useNavigate();

  
  const singinwithgoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
    
      

      const docRef = doc(db, "user", result.user.uid);
      const docSnap = await getDoc(docRef);
    
     
      if (!docSnap.exists()) {
        setErr(true);
        setTimeout(() => {
        
          navigate("/register");
        }, 5000);
       
       
      } 
      else {
        navigate("/home");
      }



    } 
    catch (error) {
      showerror = (<p className="text-red-500 text-center rounded-lg bg-slate-100 ">Something went Wrong ... </p>)
      setLoading(false);
      setErr(true);
    }
  };



















  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const email = event.target[0].value;
    const password = event.target[1].value;
  try{
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
    navigate("/home")


   

  } catch (err) {
    setErr(true);
    setLoading(false);
  
}

  };


  return (
    <div className="p-8 rounded-md bg-white  font-mulish ">
      
    <h2 className='text-center text-2xl font-bold text-violet-900' >Chit Chat</h2>
    <p className='text-center pt-2' >Login</p>
  { loading && <div className='w-full text-center mt-5'> <ClipLoader
        color={"green"}
        aria-label="Loading Spinner"
        data-testid="loader"
       
        className=' mx-auto'
      />
      </div>}
    
    {err && 
          
            showerror
          
        }
    <form onSubmit={handleSubmit} className='flex flex-col gap-7 py-6 '> 
    
      <input type='email' placeholder='Email'/>
      
      <input type='password' placeholder='Password'/>
      
      <button  className='bg-violet-700 p-2 text-white rounded-md hover:bg-violet-900 '>Sign in</button>
      
    </form>

    <button onClick={singinwithgoogle} className='p-1.5 mb-3 rounded-md flex text-sm justify-center gap-3 w-full  border-2 hover:bg-slate-100'> <img src={google} alt="loginwithgoogle" className='w-5 block'/> Sign in With Google</button>
   
    
    <p className='text-center pt-2'> You don't have an account?  <NavLink className=" text-violet-800 " to={`/register`}>Register</NavLink></p>
  </div>
  )
}

export default Login