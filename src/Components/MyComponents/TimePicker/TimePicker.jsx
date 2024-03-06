import styles from "./TimePicker.module.css";

function TimePicker({ label, time, handleTime }) {
  return (
    <div className={styles.cont}>
      <div className={styles.label}>{label}</div>
      <input type="time" value={time} onChange={(e) => handleTime(e)} />
    </div>
  );
}

export default TimePicker;
