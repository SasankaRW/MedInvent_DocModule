import styles from "./NumberSelect.module.css";

function NumberSelect({ number, handleNumber }) {
  return (
    <input
      className={styles.input}
      type="number"
      value={number}
      onChange={(e) => handleNumber(e)}
    />
  );
}

export default NumberSelect;
