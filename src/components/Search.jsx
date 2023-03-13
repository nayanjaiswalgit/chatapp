import React, { useContext, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../context/AuthContext";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [show, setshow] = useState(true);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q1 = query(
      collection(db, "user"),
      where("displayNamesplit", "==", username.replace(/\s/g, "").toLowerCase())
    );
    const q2 = query(
      collection(db, "user"),
      where("displayName", "==", username)
    );
    const q3 = query(collection(db, "user"), where("email", "==", username));
    const q4 = query(
      collection(db, "user"),
      where("phoneNumber", "==",parseFloat(username) )
    );

     

    try {
      const querySnapshot1 = await getDocs(q1);
      querySnapshot1.forEach((doc) => {
        setUser(doc.data());
      });
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        setUser(doc.data());
      });
      const querySnapshot3 = await getDocs(q3);
      querySnapshot3.forEach((doc) => {
        setUser(doc.data());
      });
      const querySnapshot4 = await getDocs(q4);
      querySnapshot4.forEach((doc) => {
        setUser(doc.data());
      });

      setErr(true);
      setLoading(false);
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  const handleKey = (event) => {
    event.key === "Enter" && handleSearch() && setLoading(true);
    event.code === "Enter" && handleSearch() && setLoading(true);
    event.keyCode === 13 && handleSearch() && setLoading(true);
  };

  const clearsearch = () => {
    setshow(true);
    setErr(false);
    setUsername("");

    setLoading(false);

    setTimeout(() => {
      setUser(null);
    }, 500);
  };
  const handleSelect = async () => {
    //check whether the group (chat in firestore) exists, if not create

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }

      //create user chats
      // userChats: {
      //   janesId:{
      //     combinedId:{
      //       userInfo{
      //         dn,img,IdleDeadline
      //       },
      //       lastMesaage:"",
      //       date:
      //       }
      //     }
      //   }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          seen: false,
          newMesaage: 0,
        },
        [combinedId + ".date"]: new Date(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          seen: true,
          newMesaage: 0,
        },
        [combinedId + ".date"]: new Date(),
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    setUser(null);
    setUsername("");
    //create user chats
  };

  var Lastlogin;

  user &&
    (Lastlogin = new Date(user.LastLoginTime).toLocaleTimeString(
      navigator.language,
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ));

  // const searchresult =user.map(data => <Searchresult key={data.uid} clickhandleSelect = {console.log("Hello")} searchdata = {data}></Searchresult> )  ;
  return (
    <>
      <div className="w-full  m-auto p-4 relative  ">
        <input
          type="text"
          className="w-full px-4 py-1 border-b-4  border-blue-200 m-auto rounded  text-xl lg:text-base md:text-base  placeholder:italic  "
          placeholder="Search User  "
          onKeyDown={handleKey}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onFocus={() => setshow(false)}
          onBlur={clearsearch}
        />
        <button className="absolute right-7 top-5  ">
          {show ? (
            <FcSearch onClick={handleSearch} className="text-2xl" />
          ) : (
            <RxCross2 onClick={clearsearch} className="text-2xl" />
          )}
        </button>
      </div>
      {loading && (
        <div className="w-full text-center">
          <ClipLoader
            color={"white"}
            aria-label="Loading Spinner"
            data-testid="loader"
            className=" block mx-auto"
          />
        </div>
      )}
      {!user && !show && err && (
        <p className="text-white text-center">User Not Found..</p>
      )}
      {user && (
        <div className=" overflow-y-auto h-[100%] border-r-4 border-violet-700 p-1">
          <div
            onClick={handleSelect}
            className="px-4  py-2 my-2 w-full  h-18 relative flex gap-3 border-b-2  border-violet-500 hover:bg-violet-800 bg-violet-700 rounded-lg"
          >
            <div className="flex items-center">
              <img
                src={user.photoURL}
                alt="profilephoto"
                className="w-12 rounded-full"
              />
            </div>
            <div className="-my-1 p-[4px]">
              <span className="text-xl   text-white  ">{user.displayName}</span>
              <p className="text-white opacity-80 text-xs font-light leading-7	"></p>

              <p className="left-2  ml-2 text-white tracking-wide opacity-90 text-xs text-bolder">
                Last Seen - {Lastlogin}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
