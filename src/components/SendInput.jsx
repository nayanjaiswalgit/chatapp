import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { memo, useContext, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";

import { RiCloseLine } from "react-icons/ri";

import ClipLoader from "react-spinners/ClipLoader";
let countmessage = 0;
function SendInput() {
  
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [imgpopup, setImgpopup] = useState(false);
  const [img, setImg] = useState(null);
  const { data } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);

  const imgsend = (e) => {
    setImgpopup(true);
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };

  // const handleKey = (event) => {
  //   event.code === "Enter" && handleSend() && clearinput();
  //   event.code === 13 && handleSend() && clearinput();
  // };

  const clearinput = (event) => {
    event.preventDefault();
    event.target[0].value="";
  };

  const handleSend = async (event) => {
  

    if (text === "" && !img) {
      return;
    }

    if (img) {
      setLoading(true);
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error\
          console.log("error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              message: arrayUnion({
                id: uuid(),
                text: text === "" ? "photo" : text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    countmessage +=1;
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMesaage"]: {
        text,
      },
      [data.chatId + ".date"]: new Date(),
     
      // [data.chatId + ".online"]:serverTimestamp(),
    });



    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMesaage"]: {
        text,
      },
      [data.chatId + ".date"]: new Date(),
      [data.chatId + ".status"]: {
        newMesaage : countmessage,
        seen: false ,
      }
    });

    setLoading(false);
    setText("");
    setImg(null);
    setImgpopup(false);
  };

  if (Object.keys(data.user).length === 0) {
    return (
      <div className="text-violet-500 text-2xl text-center pb-2">
        A0.1|Beta Version
      </div>
    );
  }

  return (
    <div className="relative w-full lg:h-14  h-16  pb-2 p-1 border-grey-300 border-t-2 border-violet-400  bg-white  ">
      <div className="  flex items-center justify-evenly h-full  relative">
        <div >
        <input
          type="file"
          id="attachment"
          name="attachment"
          className="lg:hidden md:hidden w-8 left-0 opacity-5 absolute z-40 top-1  "
          onChange={imgsend}
        />
        <IoMdAttach className="lg:text-2xl text-3xl top-1 left-1 absolute lg:invisible md:invisible "  />
        <label htmlFor="attachment" className="hover:scale-105" >

          <IoMdAttach className="lg:text-2xl text-3xl  z-20 lg:visible md:visible invisible"  />
        </label>
        </div>
        <form
          onSubmit={clearinput}
          className="flex items-center justify-evenly h-full w-full "
        >
          <input
            onChange={(event) => {
              setText(event.target.value);
            }}
            type="text"
            className=" w-[70%] h-full border-t-0 px-3  py-2  bottom-0  border-b-0 placeholder:italic  "
            placeholder="Type a Message  "
      
          />
          <ClipLoader
            color={"green"}
            aria-label="Loading Spinner"
            data-testid="loader"
            loading={loading}
            className=" mx-auto"
          />

          
            <button
              onClick={handleSend}
              className="w-10 h-10 lg:w-9 lg:h-9 rounded-full bg-green-500 hover:scale-105 text-white flex items-center justify-center"
            >
              <IoIosSend className="lg:text-xl text-3xl " />
            </button>
          
        </form>
      </div>

      {imgpopup && (
        <div className="absolute  w-[80%]  lg:w-[60%] bottom-0 right-2 bg-slate-500 bg-opacity-90  border-2 p-2 rounded-lg flex items-center justify-center flex-col ">
          <div className="relative w-full  max-w-[100%] ">
            <RiCloseLine
              onClick={() => setImgpopup(false)}
              className="   absolute top-0 left-2 bg-slate-600 bg-opacity-20 text-2xl  text-white rounded-full my-2 "
            />
            <img
              src={img && URL.createObjectURL(img)}
              alt="sendedimages"
              className="rounded-lg max-w-[70%] lg:max-h-96  h-52 w-52 m-auto  p-1 bg-white "
            />
          </div>
          <ClipLoader
            color={"green"}
            aria-label="Loading Spinner"
            data-testid="loader"
            loading={loading}
            size={100}
            className=" m-auto absolute "
          />
          <div  className="relative lg:w-[70%] w-[70%]">
            <input
              onChange={(event) => setText(event.target.value)}
              type="text"
              className=" w-full  px-4 py-1 border-b-2  border-blue-200 my-1 rounded-3xl    placeholder:italic  "
              placeholder="Add a caption...  "
            />
            <div className="flex justify-between px-2 items-center">
              <p className="bg-slate-900 bg-opacity-30 rounded-3xl px-3 text-white">
                {data.user.displayName}
              </p>
              <button
                onClick={handleSend}
                className="  w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-green-500 hover:scale-105 text-white flex items-center justify-center"
              >
                <IoIosSend className="lg:text-xl text-2xl " />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(SendInput);