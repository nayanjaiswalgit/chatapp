import Mainnav from "./Mainnav";
import SendInput from "./SendInput";
import Message from "./Message";


function Chat() {


  return (
    <div className="w-full h-full relative flex flex-col">
    <Mainnav/>
    <Message></Message>
    <SendInput/>
    </div>
  );
}

export default Chat;
