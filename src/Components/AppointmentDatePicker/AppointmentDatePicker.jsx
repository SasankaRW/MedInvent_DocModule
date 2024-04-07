import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styles from "./AppointmentDatePicker.module.css";

const AppointmentDatePicker = ({
  startDate,
  endDate,
  sessionDates,
  setSessionDates,
}) => {
  const [weekDates, setWeekDates] = useState([]);

  const oneDay = 24 * 60 * 60 * 1000;
  const days = Math.round(
    Math.abs(
      (new Date(endDate.replace(/-/g, "/")) -
        new Date(startDate.replace(/-/g, "/"))) /
        oneDay
    )
  );

  const getWeekDates = useCallback(() => {
    let current = moment(startDate);
    let week = [];

    for (let i = 0; i < days; i++) {
      week.push({
        fullDate: current.format("YYYY-MM-DD"),
        date: current.format("D"),
        day: current.format("ddd"),
      });
      current = current.add(1, "days");
    }

    return week;
  }, [startDate, days]);

  useEffect(() => {
    setWeekDates(getWeekDates());
  }, [getWeekDates]);

  useEffect(() => {
    setSessionDates([]);
  }, [startDate, endDate, setSessionDates]);

  const handleSessionDateChange = useCallback(
    (fullDate, isSelected) => {
      setSessionDates((currentDates) => {
        if (isSelected) {
          return [...currentDates, fullDate];
        } else {
          return currentDates.filter((date) => date !== fullDate);
        }
      });
    },
    [setSessionDates]
  );

  if (startDate === "" || endDate === "")
    return (
      <div style={{ marginTop: "10px", color: "gray" }}>
        Select a date range
      </div>
    );

  return (
    <div className={styles.dates}>
      {weekDates.map((day, index) => (
        <DayCheckbox
          key={index}
          day={day}
          onDateChange={handleSessionDateChange}
          isSelected={sessionDates.includes(day.fullDate)}
        />
      ))}
    </div>
  );
};

AppointmentDatePicker.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

const DayCheckbox = ({ day, onDateChange, isSelected }) => {
  const [isChecked, setIsChecked] = useState(isSelected);

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  const handleCheckboxChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onDateChange(day.fullDate, newState);
  };

  return (
    <div
      className={!isChecked ? styles.day : styles.daySelected}
      onClick={handleCheckboxChange}
    >
      <div>{day.date}</div>
      <div>{day.day}</div>
    </div>
  );
};

export default AppointmentDatePicker;
