import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { BsStarFill } from 'react-icons/bs';
import { db } from '../firebase';
import ClipLoader from "react-spinners/ClipLoader";

function Feedback() {
const [loading , setLoading] = useState(false);   
const [error, setError] = useState(false); 
const [Done, setDone] = useState(false);


    const handleSubmit =  async(e) => {


        e.preventDefault();
        setLoading(true);
        const name = e.target[0].value;
        const email = e.target[1].value;
        
        const text = e.target[4].value;
       
        const id = name + email ;
      try { await setDoc(doc(db, "feedback",id), {
            name,
            email,
            text,
          });
          setLoading(false);
          setDone(true);
        e.target[0].value ="";
          e.target[1].value ="";
          
        e.target[4].value ="";
          

        }
        catch(err){
            console.log(err);
            setError(true);
        }
    }

  return (
    <div className="p-8 rounded-md bg-white  font-mulish ">
    <h2 className='text-center text-2xl font-bold text-violet-900' >Chit Chat</h2>
    <p className='text-center pt-2' >Feedback Form</p>
    <form onSubmit={handleSubmit}  className='flex flex-col gap-5 py-6 '> 
    {error && <p className="text-red-500   text-center rounded-lg p-1 bg-slate-100 ">
            Something went Wrong ...
          </p>}
    {Done &&<p className="text-white p-2 text-center rounded-lg bg-green-500 ">
            Thankyou For Your Feedback..
          </p>}

          {!error && <div className='flex items-center justify-evenly'>
    <BsStarFill className='text-yellow-500 text-2xl' />
    <BsStarFill className='text-yellow-500 text-2xl'/>
    <BsStarFill className='text-yellow-500 text-2xl' />
    <BsStarFill className='text-yellow-500 text-2xl'/>
    <BsStarFill className='text-yellow-500 text-2xl'/>
   </div>}
   <ClipLoader
        color={"green"}
        aria-label="Loading Spinner"
        data-testid="loader"
        loading={loading}
        className='text-center mx-auto'
      />
      <input type='Name' placeholder='Name' required/>
      <input type='email' placeholder='Email' required/>
    <div className='flex items-center justify-start gap-2 '>
    <input type="radio" id="css" name="fav_language" value="For a new bug"/>
    <label for="css">Sumbit a New bug</label></div>
    <div className='flex items-center gap-2'>
    <input type="radio" id="html" name="fav_language" value="For a new feature request"/>
    <label for="html">For a New feature request</label></div>
    <textarea placeholder='Description Or Suggestion Or Problem' className='outline-none py-2' required/>
  

      <button  className='bg-violet-700 p-2 text-white rounded-md hover:bg-violet-900 '>Submit</button>
      
    </form>

    
   
    
    
  </div>
  )
}

export default Feedback