import React, { useEffect, useState } from 'react';
import { getItem } from '../helper/Storage';
import { addTimerData as addTimerDataAPI, getTimerData as getTimerDataAPI} from '../service/AuthService';

const authContext = React.createContext();
export const AuthContextProvide = (props) => {
    const userData = getItem("user");
    const [isAuth, setIsAuth] = useState(false);
    const [timeRecords, setTimeRecords] = useState([]);

    const fetchTimerData = async (userId) => {
        const timerData = await getTimerDataAPI(userId);
        console.log(timerData);
        if(timerData) {
            setTimeRecords(timerData);
        } 
    };
    
    useEffect(() => {  
       if(userData?.userId) {
           fetchTimerData(userData?.userId);
       };
    },[]);

    const getTimerRecords = () => {
        fetchTimerData(userData?.userId);
    };


    const getStartTime =async (time) => {
        const newStartTime = [...timeRecords];
        newStartTime.push(time);
        setTimeRecords(newStartTime);
        const timeData = await addTimerDataAPI(newStartTime, userData?.userId);
        if(timeData) {
            setTimeRecords(timeData);
        }
        console.log(timeData);
    }
    
    const getEndTime = async (endTime, timerId) => {
        const newEndTime = [...timeRecords];
        const getTimerIndex = newEndTime.findIndex(({id}) => +id === +timerId);
        newEndTime[getTimerIndex].endTime = endTime;
        const timeData = await addTimerDataAPI(newEndTime, userData?.userId);
        if(timeData) {
            setTimeRecords(timeData);
        }
    };

    const logInHandler = (value) => {
        setIsAuth(value);
    }
    return (
        <authContext.Provider value={{isAuth ,onTimeHistoryRender : getTimerRecords, onLogin :logInHandler, onStartTimer : getStartTime, userTimeList : timeRecords,onEndTimer :getEndTime}}>
            {props.children}
        </authContext.Provider>
    )
};

export default authContext;
