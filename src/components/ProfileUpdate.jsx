
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { db, storage } from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";
const ProfileUpdate = ({ currentUser, SetProfilepopup }) => {
  const [err, setErr] = useState(false);
  const [done, setdone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const about = e.target[1].value;
    const Phone = e.target[2].value;
    const Bio = e.target[3].value;
    const file = e.target[4].files[0] ? e.target[4].files[0]:currentUser.photoURL;

    try {
      //Create user
      setLoading(true);

      console.log(currentUser);
      //Create a unique image name
      const date = new Date();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            console.log(downloadURL);
            displayName && await updateDoc(doc(db, "lastseen", currentUser.uid), {
              displayName,
            });

             await updateDoc(doc(db, "lastseen", currentUser.uid), {
              photoURL: downloadURL,
            });
            Phone && await updateDoc(doc(db, "lastseen", currentUser.uid), { Phone });
            about && await updateDoc(doc(db, "lastseen", currentUser.uid), { about });
            Bio &&  await updateDoc(doc(db, "lastseen", currentUser.uid), { Bio });
            setLoading(false);
            setdone(true);
            setTimeout(() => {
                setdone(false);
            }, 2000);
          } catch (err) {
            console.log(err);
          }
        });
      });
    }
     catch (err) {setLoading(false);
        
        setErr(true);
    setTimeout(() => {
        setErr(false);
    }, 5000);
    }
 e.target[0].value="";
e.target[1].value="";
     e.target[2].value="";
  e.target[3].value="";
   e.target[4].files[0] ="";
  };
console.log(currentUser);
  return (
    <div className="p-2  absolute w-[90%] top-16 h-[82vh] lg:h-[65vh] flex-col md:h-[75vh] z-10  rounded-2xl flex justify-center items-center bg-slate-300 ">
    { err && <div className=" absolute w-[90%] top-5 z-50   bg-red-600 rounded-xl p-2"> <p className=" text-center">Somthing Went Wrong ! </p> </div>}
    { done && <div className=" absolute w-[90%] top-5 z-50   bg-green-600 rounded-xl p-2"> <p className=" justify-center items-center flex   ">Successful  <MdDoneAll className="mx-2"/></p> </div>}
      <form
        onSubmit={handleSubmit}
        className="  rounded text-black float-right  flex flex-col w-full  py-6  justify-center items-center overflow-hidden"
      >
        <RiCloseLine
          onClick={() => SetProfilepopup(false)}
          className="   absolute top-0 right-2 bg-slate-600 bg-opacity-20 text-2xl  text-white rounded-full my-2 "
        />
         <ClipLoader
        color={"green"}
        aria-label="Loading Spinner"
        data-testid="loader"
        loading = {loading}
        className='absolute '
        size={100}
      />
        <div className="relative lg:w-5">
          <img
            src={currentUser.photoURL}
            alt="profile"
            className="relative w-30 rounded-full mb-0"
          />
          <label
            htmlFor="file"
            className="absolute -bottom-4 -right-4 group flex justify-center items-center bg-green-600  rounded-full p-1 m-2 text-white"
          >
            <AiOutlineCamera className="text-4xl p-1" />
            <p className="hidden p-1 "> Upload</p>
          </label>
        </div>

        <label for="text" className=" w-48 py-1 opacity-90 align-self">
          Name
        </label>
        <input
          id="text"
          type="text"
          placeholder={currentUser.displayName}
          className="pl-4 w-56 rounded-xl p-1 placeholder-black px-2 bg-slate-100 "
        />
        <label for="about " className=" w-48 py-1 opacity-90 align-self">
          About
        </label>
        <input
          id="about"
          type="text"
       
          className="pl-4  w-56 rounded-xl p-1 placeholder-black px-2  "
        />
        <label for="phone " className=" w-48 py-1 opacity-90 align-self">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          placeholder={currentUser.phoneNo}
          className="pl-4  w-56 rounded-xl p-1 placeholder-black px-2   "
        />
        <label for="textarea " className=" w-48 py-1 opacity-90 align-self">
          Bio
        </label>
        <textarea
          id="textarea"
          className="pl-4 py-1  w-56 rounded-xl placeholder-black placeholder:font-medium outline-0"
        ></textarea>
        <input accept="image/*" className="hidden" type="file" id="file" />
        <button className="bg-green-600 text-white p-2 rounded-md mt-5">
          Update
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default ProfileUpdate;
