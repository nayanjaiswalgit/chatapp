
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";

import ClipLoader from "react-spinners/ClipLoader";


function SendInput() {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const [loading , setLoading] = useState(false);   


  const handleKey = (event) => {
    
    event.code === "Enter" &&  handleSend() && clearinput();
    event.code === 13 &&  handleSend() && clearinput();
   
  };
  
  const clearinput=(event)=>{
    event.preventDefault();
   event.target[0].value = "";
  }

  const handleSend = async () => {
   
    if(text === ""){
      return
    }
if(img){
  const storageRef = ref(storage, uuid);

    const uploadTask = uploadBytesResumable(storageRef, img);


      uploadTask.on(
        "state_changed",
        (error) => {
          //setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
              message : arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL
              }),
            });
          }); 
        }
      );


}
else {



  await updateDoc(doc(db,"chats",data.chatId),{
    message : arrayUnion({
      id:uuid(),
      text,
      senderId:currentUser.uid,
      date:Timestamp.now(),
    }),
});
  }

 await updateDoc(doc(db,"userChats",currentUser.uid),{
  [data.chatId + ".lastMesaage"]:{
    text,
  },
  [data.chatId + ".date"]:serverTimestamp(),
  // [data.chatId + ".online"]:serverTimestamp(),
 }) ;




  
  
  await updateDoc(doc(db,"userChats",data.user.uid),{
    [data.chatId + ".lastMesaage"]:{
      text,
    },
    [data.chatId + ".date"]:serverTimestamp(),
  }) ;
  setText("");
  setImg(null);
};

if(Object.keys( data.user).length === 0){
  return (<div className="text-violet-500 text-2xl text-center pb-2">A0.1|Beta Version</div>)
}

  return (

    <div className=" relative w-full lg:h-14  h-16  pb-2 p-1 border-grey-300 border-t-4 border-violet-400  bg-white  ">
        <div className="flex items-center justify-evenly h-full ">
        <input  type='file' id="attachment" name="attachment" className="hidden"  onChange={event=>console.log(event.target.files[0])}/>
        <label htmlFor="attachment"  className="hover:scale-105"> {img} <IoMdAttach className="lg:text-2xl text-3xl" /></label>
      <form  onSubmit={clearinput}  className="flex items-center justify-evenly h-full w-full " >
        <input onChange={event=>{
         
          setText(event.target.value)}}
      
         
          type="text"
          className=" w-[70%] h-full border-t-0 px-3  py-2  bottom-0  border-b-0 placeholder:italic  "
          placeholder="Type a Message  "
        />
<ClipLoader
        color={"green"}
        aria-label="Loading Spinner"
        data-testid="loader"
        loading = {loading}
        className=' mx-auto'
      />

{    !loading &&  <button  onClick={ handleSend }  className="w-10 h-10 lg:w-9 lg:h-9 rounded-full bg-green-500 hover:scale-105 text-white flex items-center justify-center">
        
     <IoIosSend className="lg:text-xl text-3xl " />
        </button>}
        </form>
      </div>
      </div>
  );
}

export default SendInput;
