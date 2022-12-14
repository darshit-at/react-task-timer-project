import React, { useCallback, useEffect, useState } from "react";
import { getItem } from "../helper/Storage";
import {
  addTimerData as addTimerDataAPI,
  getTimerData as getTimerDataAPI,
} from "../service/AuthService";
import { setItem } from "../helper/Storage";
const authContext = React.createContext();

export const AuthContextProvide = (props) => {
  const userData = getItem("user");
  const [isAuth, setIsAuth] = useState(false);
  const [timeRecords, setTimeRecords] = useState([]);
  const [timer, setTimer] = useState({
    currentDropWidth: "",
    isStartTimer: "",
  });

  const fetchTimerData = async (userId) => {
    console.log(userData)
    const timerData = await getTimerDataAPI(userId);
    console.log(timerData)
    if (timerData?.userTimerData) {
      setTimeRecords(timerData?.userTimerData);
      setItem(
        "currentWidth",
        JSON.stringify({
          width: timerData?.width,
          isUserStartTimer: timerData?.isUserStartTimer,
        })
      );
    }
  };

  useEffect(() => {
    const userId = userData?.userId
    if(userId) {
      fetchTimerData(userId);
    }
   
  }, []);

  useEffect(() => {
    const sentTimerData = async () => {
      const timerDetails = {
        width: timer.currentDropWidth,
        isUserStartTimer: timer.isStartTimer,
        userTimerData: timeRecords,
      };
      const response = await addTimerDataAPI(timerDetails, userData?.userId);
      if(response?.width !== '' && response?.isUserStartTimer !== '') {
        setItem(
          "currentWidth",
          JSON.stringify({
            width: response?.width,
            isUserStartTimer: response?.isUserStartTimer,
          })
        );
      }
      
    };
    sentTimerData();
  }, [timer.currentDropWidth, timer.isStartTimer]);

  const getDropWidth = (value) => {
    setTimer((previewState) => {
      return {
        ...previewState,
        currentDropWidth: value.width,
        isStartTimer: value.isUserStartTimer,
      };
    });
  };

  
  const getTimerRecords = () => {
    const userId = userData?.userId
    if(userId) {
      fetchTimerData(userId);
    }
  }

  const startTimeHandler = (time) => {
    const newStartTime = [...timeRecords];
    newStartTime.push(time);
    setTimeRecords(() => newStartTime);
  };

  const endTimeHandler = (endTime, timerId) => {
    const newEndTime = JSON.parse(JSON.stringify(timeRecords));
    const setEndTime = newEndTime.map((item, index) => {
      if (item.endTime === "") {
        item.endTime = endTime;
      }
      return item;
    });
    setTimeRecords(() => setEndTime);
  };

  const logInHandler = (value) => {
    setIsAuth(value);
  };

  const logOutHandler = (value) => {
    setIsAuth(value); 
  };

  return (
    <authContext.Provider
      value={{
        isAuth,
        onComponentMount: getTimerRecords,
        onLogin: logInHandler,
        onStartTimer: startTimeHandler,
        onChangeDropWidth: getDropWidth,
        userTimeList: timeRecords,
        onLogOut : logOutHandler,
        onEndTimer: endTimeHandler,   
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
