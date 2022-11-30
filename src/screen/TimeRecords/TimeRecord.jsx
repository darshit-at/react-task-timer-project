import React, { Fragment, useContext } from "react";
import "./TimeRecord.css";
import authContext from "../../context/AuthContext";

const TimeRecord = (props) => {
  const { userTimeList } = useContext(authContext);
  
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  };

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }
  
  const showTimeRecord = (item, index) => {
    return (
      <tr key={`${index}`}>
        <td>{index + 1}</td>
        <td>{formatDate(new Date(item?.currentDate))}</td>
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
