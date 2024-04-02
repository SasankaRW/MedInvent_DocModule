import styles from "./Button.module.css";

function Button({ text, onClick, width }) {
  return (
    <button className={styles.btn} onClick={onClick} style={{ width: width }}>
      {text}
    </button>
  );
}

export default Button;
