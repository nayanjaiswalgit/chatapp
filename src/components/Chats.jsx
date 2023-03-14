import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";
import { db } from "../firebase";
import { FcSearch } from "react-icons/fc";
import ClipLoader from "react-spinners/ClipLoader";
import Timestamp from "./Timestamp";

function Chats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch,setShowBackButton } = useContext(ChatContext);

  const fatchdata = async() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
    });

    await updateDoc(doc(db, "userData", currentUser.uid), {
      LastSeen: new Date(),
      online: true,
    });

    setLoading(false);

    return () => {
      unsub();
    };
  };

  useEffect(() => {
    setLoading(true);
    try {
      currentUser.uid && fatchdata();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("error" + err);
    }
  }, [currentUser.uid]);


  const handleSelect = async (extaindchat) => {
  
    const combinedId =
      currentUser.uid >extaindchat.userInfo.uid
        ? currentUser.uid +extaindchat.userInfo.uid
        : extaindchat.userInfo.uid + currentUser.uid;


        setShowBackButton(true);

    dispatch({ type: "CHANGE_USER", payload: extaindchat?.userInfo });
    
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [ combinedId + ".status"]: {
      
      seen: true,
      newMesaage: 0,
      }
    });
    
  };
 
  if (chats === {} || chats === null  || chats === undefined ) {
    return (
      <div className="h-[50%] w-full text-white text-2xl  flex justify-evenly items-center flex-col  ">
        <ClipLoader
          color={"white"}
          aria-label="Loading Spinner"
          data-testid="loader"
          size={50}
          loading={loading}
          className=" mx-auto"
        />
        {!loading && <FcSearch className="text-8xl text-center" />}
        <p className="text-center"> Search And Start Chat</p>{" "}
      </div>
    );
  }

  return (
    <div className=" overflow-y-auto h-[80%] border-r-4 border-violet-600 p-1  scrollbar-thin scrollbar-track-violet-500 ">
      { Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            onClick={() => handleSelect(chat[1])}
            className="px-4  py-2 my-2 w-full  h-18 relative flex gap-3 border-b-2 border-violet-500  hover:bg-violet-700 hover:rounded-lg"
          >
            <div className="flex items-center">
              <img
                src={chat[1]?.userInfo?.photoURL}
                alt="profilephoto"
                className="w-12 rounded-full"
              />
            </div>
            <div className="-my-1">
              <span className="  text-white ">
                {chat[1]?.userInfo?.displayName}
              </span>
           
              {<p className="text-white opacity-80 text-xs font-light leading-5 overflow-hidden	max-h-5 ">
                {chat[1].lastMesaage?.text?.substring(0, 20)}
                {chat[1].lastMesaage?.text?.length > 20 ? "..." : ""}
                {chat[1].lastMesaage?.text === "" && "🖼️ Photo" }
              </p>}
             {!chat[1]?.status?.seen && <div className=" absolute  top-2   right-3 bg-green-500 w-4 h-4 rounded-full flex items-center justify-center drop-shadow-lg">
                <p className=" text-white  text-xs text-bolder drop-shadow-lg">{chat[1]?.status?.newMesaage}</p> 
              </div>}

              <p className="absolute right-3 bottom-2 text-white  opacity-90 text-xs text-bolder">
                {Timestamp(chat[1]?.date.seconds)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );

}

export default Chats;