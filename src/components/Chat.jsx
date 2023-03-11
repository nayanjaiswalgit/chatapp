import Mainnav from "./Mainnav";
import SendInput from "./SendInput";
import Message from "./Message";


function Chat(props) {


  return (
    <div className=" relative w-full h-full  flex flex-col">
    <Mainnav showchat = {props.showchat} setshowchat={props.setshowchat} />
    <Message></Message>
    <SendInput/>
    </div>
  );
}

export default Chat;
