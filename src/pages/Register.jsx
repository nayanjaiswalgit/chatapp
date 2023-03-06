import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth, storage,db } from "../firebase";
import addavatar from "../img/addavatar.png";
import google from ".././img/Google.png";
import { doc, setDoc } from "firebase/firestore"; 

function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {

            await updateProfile(res.user,{
              displayName,
              photoURL:downloadURL
            })
            await setDoc(doc(db, "user", res.user.uid), {
              uid : res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {
            
            });
            navigate("/home");

          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="py-8 px-16 lg:w-[30%] rounded-md bg-white  font-mulish ">
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
        <input className="hidden" type="file" id="file" />
        <label htmlFor="file" className="flex justify-start items-center">
          <img src={addavatar} className="w-8 opacity-60" alt="" />
          <p className="text-violet-300 px-5"> Add an avator</p>
        </label>

        <button className="bg-violet-700 hover:bg-violet-900  p-2 text-white rounded-md ">
          Sign up
        </button>
      </form>
      <button className="p-1.5 mb-3 rounded-md flex text-sm justify-center gap-3 w-full  border-2 hover:bg-slate-100">
        {" "}
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
