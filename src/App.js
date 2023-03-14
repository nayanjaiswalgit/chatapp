import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feedback from "./pages/Feedback";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import {  useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const App = () => {

  const { currentUser } = useContext(AuthContext);
  
  
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/register" />;
    }
    
    return children;
  };



  function handler() {

        
    updateDoc(doc(db, "userData", currentUser.uid), {
    
      LastSeen : new Date(),
      online : false,
    });
setTimeout(() => {
       
}, 1000);}
    
  

  

  useEffect(() => {
    window.addEventListener("beforeunload",handler );
    window.addEventListener('onbeforeunload', handler);
   

    return () => {
      window.addEventListener("beforeunload",handler );
      window.addEventListener('onbeforeunload', handler);
   
    };
  }, []);
 

  
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center ">

      <Routes>

        <Route
          path="/*" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>

   { !currentUser   && <>
     <Route path="/*" element={<Welcome />}></Route>
     
     <Route path="/login" element={<Login />}></Route>
     <Route path="/register" element={<Register /> }></Route>
    
     
     </>}
        <Route path="/feedback" element={<Feedback />}></Route>
      </Routes>
    </div>
  );
};
export default App;
