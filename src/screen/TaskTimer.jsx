import { Spinner } from 'baseui/spinner';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import authContext from '../context/AuthContext';
import DashBoard from './Dashboard/Dashboard';
import TimeRecord from './TimeRecords/TimeRecord';

const TaskTimer = (props) => {
    const {  onTimeHistoryRender, userTimeList } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        onTimeHistoryRender();
        const clear =  setTimeout(() => {
            setLoading(false);
            clearTimeout(clear);
        }, 500);
    },[]);

    return (
         <Fragment>
            {userTimeList?.length === 0 && loading ? <div id="loader"><Spinner /></div>  : <>
            <DashBoard /> 
            </>}
            {userTimeList?.length > 0  &&  <TimeRecord />}
         </Fragment>
    )
};

export default TaskTimer;