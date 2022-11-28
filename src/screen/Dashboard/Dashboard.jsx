import React, { Fragment, useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import ContentTitle from "../../components/ContentTitle/ContentTitle";
import Card from "../../components/UI/Card";
import authContext from "../../context/AuthContext";
import { getItem, removeKey, setItem } from "../../helper/Storage";
import "./Dashboard.css";
import { ProgressBar } from "baseui/progress-bar";
import TimeRecord from "../TimeRecords/TimeRecord";
import { Spinner } from "baseui/spinner";
let clearTimer = "";
const DashBoard = (props) => {
  const maxTimeMin = 540;

  const { onStartTimer, onEndTimer, onTimeHistoryRender, userTimeList } =useContext(authContext);
  const [dropWidth, setDropWidth] = useState(0);
  const [isUserStartTimer, setIsUserStartTimer] = useState(false);
  const [dropBackgroundColor, setDropBackGroundColor] = useState("");
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    const userStartTime = getItem("currentWidth");
    const previewTimeId = getItem("previewTimeId");
    if (userStartTime !== null) {
      setDropWidth(userStartTime.width);
      setIsUserStartTimer(userStartTime?.isUserStartTimer);
      setTimerId(+previewTimeId?.timerId);
    }
    onTimeHistoryRender();
  }, []);

  console.log(timerId);
  console.log()
  useEffect(() => {
    if (isUserStartTimer) {
      clearTimer = setInterval(() => {
        setDropWidth((previewState) => +previewState + 1);
      }, 1000);
    } else if (!isUserStartTimer) {
      clearInterval(clearTimer);
    }
    return () => {
      clearInterval(clearTimer);
    };
  }, [isUserStartTimer]);

  useEffect(() => {
    if (dropWidth > 0) {
      setItem(
        "currentWidth",
        JSON.stringify({ width: dropWidth, isUserStartTimer: isUserStartTimer })
      );
    }
    if (dropWidth < 270) {
      setDropBackGroundColor("red");
    } else if (dropWidth > 270 && dropWidth < 480) {
      setDropBackGroundColor("#FFA500");
    }
    if (dropWidth >= 480 && dropWidth < 540) {
      setDropBackGroundColor("#42C0D2");
    } else if (dropWidth >= 540) {
      setDropBackGroundColor("green");
    }
  }, [dropWidth, isUserStartTimer]);

  const startTimerHandler = () => {
    const date = new Date();
    if (dropWidth > 540) {
      removeKey("currentWidth");
      setDropWidth(0);
    }
    const timeDetails = {
      id: timerId,
      currentDate: date.toLocaleDateString(),
      startTime: date.toLocaleTimeString(),
      endTime: "",
    };
    onStartTimer(timeDetails);
    setTimeout(() => {
      setIsUserStartTimer(true);
    }, 500);
  };

  const endTimerHandler = () => {
    const endTime = new Date().toLocaleTimeString();
    onEndTimer(endTime, timerId);
    setTimerId((previewState) => +previewState + 1);
    setIsUserStartTimer(false);
    setItem("previewTimeId", JSON.stringify({ timerId: timerId + 1 }));
  };

  const convertSecondsToHour = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    console.log("hours: " + hours);
    console.log("minutes: " + minutes);
    console.log("seconds: " + seconds);

    // If you want strings with leading zeroes:
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <Fragment>
      <Card className="dashboard">
        <ContentTitle title="Timer" />
        <div className="timer-input">
          <ProgressBar
            value={(dropWidth / maxTimeMin) * 100}
            overrides={{
              Bar: {
                style: ({ $theme }) => ({ height: "30px" }),
              },
              BarProgress: {
                style: ({ $theme }) => ({
                  backgroundColor: dropBackgroundColor,
                }),
              },
            }}
          />
          <h2>{convertSecondsToHour(dropWidth)}</h2>

          {isUserStartTimer ? (
            <Button
              type="button"
              classes="btn btn-danger ml-5"
              onClick={endTimerHandler}
            >
              Stop Timer
            </Button>
          ) : (
            <Button type="button" onClick={startTimerHandler}>
              Start Timer
            </Button>
          )}
        </div>
      </Card>
      {userTimeList?.length > 0 && <TimeRecord userTimeList = {userTimeList}/>}
      {userTimeList?.length === 0 && <div id="loader"><Spinner /></div>}
    </Fragment>
  );
};
export default DashBoard;
