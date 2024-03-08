import styles from "./TextArea.module.css";

function TextArea({ value, handleChange }) {
  return (
    <textarea
      name=""
      id=""
      rows="3"
      className={styles.textarea}
      value={value}
      onChange={handleChange}
      placeholder="Enter a note if available"
    ></textarea>
  );
}

export default TextArea;
