
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";

function Mainsearch() {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () => {
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
 }) ;
  setText("");
  setImg(null);
  
  await updateDoc(doc(db,"userChats",data.user.uid),{
    [data.chatId + ".lastMesaage"]:{
      text,
    },
    [data.chatId + ".date"]:serverTimestamp(),
  }) ;
  setText("");
  setImg(null);
};



  return (
    <div className="  w-full lg:h-12  h-16  bottom-0 absolute  border-grey-300   bg-white  ">
        <div className="flex items-center justify-evenly h-full ">
        <input type='file' id="attachment" name="attachment" className="hidden"  onChange={event=>setImg(event.target.files[0])}/>
        <label htmlFor="attachment"  className="hover:scale-105">  <IoMdAttach className="lg:text-2xl text-3xl" /></label>
      
        <input onChange={event=>{
         
          setText(event.target.value)}}

          value = {text}
          type="text"
          className=" w-[70%] h-full border-t-0 px-3  py-2  bottom-0  border-b-0 placeholder:italic  "
          placeholder="Type a Message  "
        />

         
        <div onClick={handleSend} className="w-10 h-10 lg:w-9 lg:h-9 rounded-full bg-green-500 hover:scale-105 text-white flex items-center justify-center">
          <IoIosSend className="lg:text-xl text-3xl " />
        </div>
      </div>
      </div>
  );
}

export default Mainsearch;
