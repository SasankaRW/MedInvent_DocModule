import * as React from "react";
import styles from "./ResultItem.module.css";

export function ResultItem({ item, subHeading }) {
  return (
    <div className={`mb-2 px-4 py-2 rounded ${styles.item}`} key={item}>
      <div>{item}</div>
      <small>{subHeading}</small>
    </div>
  );
}
