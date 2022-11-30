import React, { Fragment, useContext, useEffect } from "react";
import Login from "./screen/Auth/Login/Login";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./screen/Auth/SignUp/SignUp";
import authContext from "./context/AuthContext";
import MainHeader from "./components/MainHeader/MainHeader";
import { getItem } from "./helper/Storage";
import Profile from "./screen/Profile/Profile";
import TimeRecord from "./screen/TimeRecords/TimeRecord";
import TaskTimer from "./screen/TaskTimer";

function App() {
  const isUserAlreadyLogin = getItem("user");
  const navigator = useNavigate();
  const { isAuth } = useContext(authContext);

  useEffect(() => {
    if (!isAuth && !isUserAlreadyLogin?.userToken) {
      navigator("/auth");
    }
  }, []);

  return (
    <Fragment>
      {isAuth && <MainHeader />}
      {!isAuth && isUserAlreadyLogin?.userToken && <MainHeader />}
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
