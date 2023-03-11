import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feedback from "./pages/Feedback";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import {  useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ChatContext } from "./context/ChatContest";
const App = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  window.addEventListener("onbeforeunload",  async(event) => {
    updateDoc(doc(db, "lastseen", currentUser.uid), {
    
      LastSeen : new Date(),
      online : false,
    });

    
})


 

  
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center ">
      <Routes>
      <Route path="/*" element={<Welcome />}></Route>
        {/* <Route path="/*" element={<Welcome />}></Route> */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={currentUser ?<ProtectedRoute>
              <Home />
            </ProtectedRoute>:<Login />}></Route>
        <Route path="/register" element={currentUser ? <ProtectedRoute>
          <Home />
        </ProtectedRoute>:<Register /> }></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
      </Routes>
    </div>
  );
};
export default App;
