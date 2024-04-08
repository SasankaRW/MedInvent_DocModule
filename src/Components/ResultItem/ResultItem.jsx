import * as React from "react";
import styles from "./ResultItem.module.css";
import Loader2 from "../Loader2/Loader2";
import axios from "axios";

export function ResultItem({ item, type }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRequested, setIsRequested] = React.useState(false);

  const renderAction = () => {
    if (isLoading) {
      return <Loader2 />;
    } else if (isRequested) {
      return <div className={styles.req}>Requested</div>;
    } else {
      return (
        <button onClick={onAddClick} className={styles.btn}>
          Add {type}
        </button>
      );
    }
  };

  function onAddClick() {
    setIsLoading(true);
    console.log(item);
    axios
      .post("http://localhost:8080/add", {})
      .then((response) => {
        setIsRequested(true);
      })
      .catch((error) => {
        console.error("Error booking appointment", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div
      className={`mb-2 px-4 py-2 rounded-4 d-flex justify-content-between align-items-center ${styles.item}`}
      key={item.name}
    >
      <div>
        <div>{item.name}</div>
        {type === "clinic" && <small>{item.address}</small>}
        {type === "doctor" && <small>{item.specialty}</small>}
      </div>
      <div>{renderAction()}</div>
    </div>
  );
}
