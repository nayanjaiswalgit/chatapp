import Mainnav from "./Mainnav";
import Mainsearch from "./Mainsearch";
import Message from "./Message";

function Chat() {
  return (
    <div className="w-full h-full relative flex flex-col">
    <Mainnav/>
    <Message></Message>
    <Mainsearch/>
    </div>
  );
}

export default Chat;
