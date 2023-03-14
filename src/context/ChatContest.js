
import { createContext, useContext,  useReducer, useState } from "react";


import { AuthContext } from "./AuthContext";
export const ChatContext = createContext();

    
export const ChatContextProvider = ({ children }) => {

  const [showBackButton, setShowBackButton] = useState(false);







const { currentUser } = useContext(AuthContext);





  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    chat : false,
  };

 



  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
              chat : true,
        };
        case "SHOWCHAT": 
        return {
          ...state,
          chat : false ,

        }
        
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
  return (
    <ChatContext.Provider value={{ data: state, dispatch , showBackButton, setShowBackButton }} >
      {children}
    </ChatContext.Provider>
  );
};
