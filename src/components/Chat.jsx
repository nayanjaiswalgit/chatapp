import Mainnav from "./Mainnav";
import SendInput from "./SendInput";
import Message from "./Message";


function Chat() {


  return (
    <div className=" relative w-full h-full  flex flex-col">
    <Mainnav  />
    <Message></Message>
    <SendInput/>
    </div>
  );
}

export default Chat;
