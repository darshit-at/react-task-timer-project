import React, { Fragment, useContext } from "react";
import "./TimeRecord.css";
import authContext from "../../context/AuthContext";
import { format } from 'date-fns'

const TimeRecord = (props) => {
  const { userTimeList } = useContext(authContext);

  function formatDate(date) {
    const timerDate = date.split("/");
    const month= +timerDate[0] - 1;
    const year = +timerDate[2];
    const day = +timerDate[1];
    return format(new Date(year, month, day), "dd-MM-yyyy");

  }

  const showTimeRecord = (item, index) => {

    return (
      <tr key={`${index}`}>
        <td>{index + 1}</td>
        <td>{formatDate(item?.currentDate)}</td>
        <td>{item.startTime}</td>
        <td>{item.endTime}</td>
      </tr>
    );
  };

  return (
    <Fragment>
      <table className="table table-responsive table-striped table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End timer</th>
          </tr>
        </thead>
        <tbody>
          {userTimeList?.length > 0 ? (
            userTimeList?.map((item, index) => showTimeRecord(item, index))
          ) : (
            <tr>
              <td colSpan={12}>No Data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};
export default TimeRecord;
