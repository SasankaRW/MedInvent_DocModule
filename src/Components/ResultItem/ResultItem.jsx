import * as React from "react";
import styles from "./ResultItem.module.css";
import Loader2 from "../Loader2/Loader2";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";
import { useAlert } from "../../Contexts/AlertContext";
import config from "../../config";

export function ResultItem({ item, type }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRequested, setIsRequested] = React.useState(false);
  const { user } = useAuth();
  const { showAlert } = useAlert();

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
    axios
      .post(`${config.baseURL}/visiting/newvisiting`, {
        doctor_id: type === "doctor" ? item.doctor_id : user.id,
        clinic_id: type === "doctor" ? user.id : item.clinic_id,
        reqSentBy: type === "doctor" ? "clinic" : "doctor",
      })
      .then((response) => {
        setIsRequested(true);
      })
      .catch((error) => {
        showAlert("error", "Error sending the request");
        console.error("Error sending the request", error);
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
        <div>
          {type === "clinic" ? item.name : item.fname + " " + item.lname}
        </div>
        {type === "clinic" && <small>{item.address}</small>}
        {type === "doctor" && <small>{item.specialty}</small>}
      </div>
      <div>{renderAction()}</div>
    </div>
  );
}
