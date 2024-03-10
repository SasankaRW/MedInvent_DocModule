import React from "react";
import styles from "./Day.module.css";

function Day({ day, isSelected, toggleDay }) {
  return (
    <div
      className={`text-center mx-1 rounded ${styles.day} ${
        isSelected ? styles.selected : ""
      }`}
      onClick={() => toggleDay(day)}
    >
      {day}
    </div>
  );
}
export default Day;
