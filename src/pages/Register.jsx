import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, storage, db } from "../firebase";
import addavatar from "../img/addavatar.png";
import google from ".././img/Google.png";
import {  doc, getDoc, setDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";

function Register() {
  const provider = new GoogleAuthProvider();
  const [err, setErr] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const singwithgoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
    


      const docRef = doc(db, "user", result.user.uid);
      const docSnap = await getDoc(docRef);
    
     
      if (!docSnap.exists()) {
        await setDoc(doc(db, "user", result.user.uid), {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          LastLoginTime : result.user.metadata.lastSignInTime
        });
  
  
       await setDoc(doc(db, "userChats", result.user.uid), {});
      } 
        
   

      setLoading(false);
    
      navigate("/home",{ replace: true });


    } 
    catch (error) {

      setErr(true);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "user", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
         
            navigate("/home",{ replace: true });
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-10 lg:w-[30%] rounded-md bg-white  font-mulish ">
      <h2 className="text-center text-2xl font-bold text-violet-900">
        Chit Chat
      </h2>
      <p className="text-center pt-2">Register</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 py-6 ">
        {err && (
          <p className="text-red-500 text-center rounded-lg bg-slate-100 ">
            Something went Wrong ...
          </p>
        )}
        <input type="text" placeholder="Display Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input accept="image/*" className="hidden" type="file" id="file" />
       
       <ClipLoader
        color={"green"}
        aria-label="Loading Spinner"
        data-testid="loader"
        loading = {loading}
        className=' mx-auto'
      />
         { !loading && <div>
        <label  htmlFor="file" className="flex justify-start items-center">
          <img src={addavatar} className="w-8 opacity-60" alt="" />
          <p className="text-violet-300 px-5"> Add an avator</p>
        </label>
      </div>}

        <button className="bg-violet-700 hover:bg-violet-900  p-2 text-white rounded-md ">
          Sign up
        </button>
      </form>
      <button
        onClick={singwithgoogle}
        className="p-1.5 mb-3 rounded-md flex text-sm justify-center gap-3 w-full  border-2 hover:bg-slate-100"
      >
        <img src={google} alt="loginwithgoogle" className="w-5 block" /> Sign Up
        With Google
      </button>

      <p className="text-center pt-2">
        {" "}
        You do have an account?{" "}
        <NavLink className=" text-violet-800 " to={`/login`}>
          login
        </NavLink>
      </p>
    </div>
  );
}

export default Register;
