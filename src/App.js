import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import {  useContext } from "react";
import { AuthContext } from "./context/AuthContext";
const App = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center ">
      <Routes>
        <Route path="/*" element={<Welcome />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
};
export default App;
