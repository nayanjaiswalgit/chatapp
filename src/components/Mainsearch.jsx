
import { IoMdAttach } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

function Mainsearch() {

  return (
    <div className="  w-full lg:h-12  h-16  bottom-0 absolute  border-grey-300   bg-white  ">
        <div className="flex items-center justify-evenly h-full ">
        <input type='file' id="attachment" name="attachment" className="hidden" />
        <label htmlFor="attachment"  className="hover:scale-105">  <IoMdAttach className="lg:text-2xl text-3xl" /></label>
      
        <input
          type="text"
          className=" w-[70%] h-full border-t-0 px-3  py-2  bottom-0  border-b-0 placeholder:italic  "
          placeholder="Type a Message  "
        />

         
        <div className="w-10 h-10 lg:w-9 lg:h-9 rounded-full bg-green-500 hover:scale-105 text-white flex items-center justify-center">
          <IoIosSend className="lg:text-xl text-3xl " />
        </div>
      </div>
      </div>
  );
}

export default Mainsearch;
