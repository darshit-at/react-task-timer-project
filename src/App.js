import React, { Fragment, useContext, useEffect } from "react";
import Login from "./screen/Auth/Login/Login";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./screen/Auth/SignUp/SignUp";
import Profile from "./screen/Profile/Profile";
import TimeRecord from "./screen/TimeRecords/TimeRecord";
import TaskTimer from "./screen/TaskTimer";
import authContext from "./context/AuthContext";
import { getItem } from "./helper/Storage";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const { isAuth } = useContext(authContext);
  const navigater = useNavigate();
  const user = getItem("user");
  useEffect(() => {
    if (!isAuth && !user?.userToken) {
      navigater("/auth");
    }
  }, []);

  return (
    <Fragment>
      {isAuth && <MainHeader />}
      {!isAuth && user?.userToken && <MainHeader />}
      <Routes>
        <Route path="/" element={<TaskTimer />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/timeHistory" element={<TimeRecord />} />
      </Routes>
    </Fragment>
  );
}

export default App;
