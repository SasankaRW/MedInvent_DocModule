import styles from "./AppointmentDatePicker.module.css";

function AppointmentDatePicker({ startDate, endDate }) {
  return (
    <div>
      <div>{startDate}</div>
      <div>{endDate}</div>
    </div>
  );
}

export default AppointmentDatePicker;
