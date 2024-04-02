import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import styles from "./AppointmentDatePicker.module.css";

const AppointmentDatePicker = ({ startDate, endDate }) => {
  const [weekDates, setWeekDates] = useState([]);

  const oneDay = 24 * 60 * 60 * 1000;
  const days = Math.round(
    Math.abs(
      (new Date(endDate.replace(/-/g, "/")) -
        new Date(startDate.replace(/-/g, "/"))) /
        oneDay
    )
  );

  function getWeekDates(start) {
    let current = moment(start);
    let week = [];

    for (let i = 0; i < days; i++) {
      week.push({
        date: current.format("D"),
        day: current.format("ddd"),
      });
      current = current.add(1, "days");
    }

    return week;
  }

  useEffect(() => {
    setWeekDates(getWeekDates(startDate));
  }, [getWeekDates, startDate]);

  if (startDate === "" || endDate === "")
    return (
      <div style={{ marginTop: "10px", color: "gray" }}>
        Select a date range
      </div>
    );
  return (
    <div className={styles.dates}>
      {weekDates.map((day) => (
        <DayCheckbox day={day} />
      ))}
    </div>
  );
};

AppointmentDatePicker.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default AppointmentDatePicker;

const DayCheckbox = ({ day }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      key={day.date}
      className={!isChecked ? styles.day : styles.daySelected}
      onClick={handleCheckboxChange}
    >
      <div>{day.date}</div>
      <div>{day.day}</div>
    </div>
  );
};
