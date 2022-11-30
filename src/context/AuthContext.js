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

  const fetchTimerData = async (userId) => {
    const timerData = await getTimerDataAPI(userId);
    console.log(timerData);
    if (timerData) {
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
    console.log("this useEffect is run");
    if (userData?.userId) {
      fetchTimerData(userData?.userId);
    }
  }, [userData?.userId]);

  const getDropWidth = async (value) => {
    const timerDetails = {
      width: value.width,
      isUserStartTimer: value.isUserStartTimer,
      userTimerData: timeRecords,
    };
    const response = await addTimerDataAPI(timerDetails, userData?.userId);
    setItem(
      "currentWidth",
      JSON.stringify({
        width: response?.width,
        isUserStartTimer: response?.isUserStartTimer,
      })
    );
  };

  const getTimerRecords = useCallback(() => {
    fetchTimerData(userData?.userId);
  }, [userData?.userId]);

  const startTimeHandler = (time) => {
    const newStartTime = [...timeRecords];
    newStartTime.push(time);
    setTimeRecords(newStartTime);
  };

  const endTimeHandler = (endTime, timerId) => {
    const newEndTime = JSON.parse(JSON.stringify(timeRecords));
    const setEndTime = newEndTime.map((item, index) => {
      if (item.endTime === "") {
        item.endTime = endTime;
      }
      return item;
    });
    setTimeRecords(setEndTime);
  };

  const logInHandler = (value) => {
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
        onEndTimer: endTimeHandler,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
