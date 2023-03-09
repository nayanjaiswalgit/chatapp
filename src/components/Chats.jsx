import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContest";
import { db } from "../firebase";
import { FcSearch } from "react-icons/fc";
import ClipLoader from "react-spinners/ClipLoader";


function Chats(props) {
  const [chats, setChats] = useState([]);
  const [loading , setLoading] = useState(false);   


  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  
  
  const Timestamp = (value) => {


    try {
      const chattime = value ? value.seconds*1000 : 0 ;
      
      var d1 = new Date(chattime);
      var d2 = new Date();
      
     
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      
      if(d1.getMonth() === d2.getMonth()) {
        if(d2.getDate() === d1.getDate()){
    
    
         return d1.toLocaleTimeString(
            navigator.language,
            {
              hour: "2-digit",
              minute: "2-digit",
            }
            )
    
        }
    
        
        else if((d2.getDate() - d1.getDate() === 1 )){
          return  "Yesterday" 
        }
    
        else if((d2.getDate() - d1.getDate() < 7 )){
          return days[d1.getDay()]
        }
        else {
          
          return d1.toLocaleDateString();
        }
      }
    }
        
      catch(err){
        console.log(err);
      }
        
       
      }
  
  
  
  
  
  
  
  const fatchdata = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data());
    });
    setLoading(false);
    return () => {
      unsub();
    };
        
  };

  useEffect(() => {
    try {
      setLoading(true);
      fatchdata();
 
    } catch (err) {
     
      console.log("error" + err);
    }
  }, [currentUser.uid]);

  const handleSelect = (extaindchat) => {

    if (props.showchat) {
      props.setshowchat(false);
    }

    dispatch({ type: "CHANGE_USER", payload: extaindchat });
  };
  if(Object.entries(chats).length === 0) {
    
    return (<div className="h-[50%] w-full text-white text-2xl  flex justify-evenly items-center flex-col  ">
       <ClipLoader
        color={"white"}
        aria-label="Loading Spinner"
        data-testid="loader"
        size={50}
        loading = {loading}
        className=' mx-auto'
      />
      {!loading && <FcSearch  className="text-8xl text-center" />}<p className="text-center"> Search And Start Chat</p> </div>)
  }
  return (
    <div className=" overflow-y-auto h-[80%] border-r-4 border-violet-600 p-1  scrollbar-thin scrollbar-track-violet-500 ">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className="px-4  py-2 my-2 w-full  h-18 relative flex gap-3 border-b-2 border-violet-500  hover:bg-violet-700 hover:rounded-lg"
          >
            <div className="flex items-center">
              <img
                src={chat[1].userInfo.photoURL}
                alt="profilephoto"
                className="w-12 rounded-full"
              />
            </div>
            <div className="-my-1">
              <span className="  text-white ">
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-white opacity-80 text-xs font-light leading-7	">
                {chat[1].lastMesaage?.text}
              </p>
              <div className=" absolute  top-2   right-3 bg-green-500 w-4 h-4 rounded-full flex items-center justify-center drop-shadow-lg">
                {/* <p className="font-Tilefont text-white  text-sm text-bolder drop-shadow-lg">5</p> */}
              </div>

              <p className="absolute right-3 bottom-2 text-white  opacity-90 text-xs text-bolder">
                {  
                
                
                
                Timestamp(chat[1].date)
                
                
                
                
                
                
                
                
                }
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;
