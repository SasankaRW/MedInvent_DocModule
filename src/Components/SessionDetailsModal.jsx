import axios from "axios";
import Button from "./Button/Button";
import config from "../config";
import { useAlert } from "../Contexts/AlertContext";
import { useState } from "react";
import Loader2 from "./Loader2/Loader2";

export function SessionDetailsModal({
  session,
  updateSessionState,
  type,
  closeModal,
}) {
  const { showAlert } = useAlert();

  const [isLoading, setIsLoading] = useState(false);

  function convertTimeFormat(time) {
    let [hours, minutes] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    return `${hours}:${minutes} ${period}`;
  }

  function onMarkAsArrived() {
    setIsLoading(true);
    axios
      .put(`${config.baseURL}/session/update/${session.session_id}`, {
        isArrived: true,
      })
      .then((res) => {
        showAlert("success", "Marked as arrived.");
        closeModal();
        updateSessionState({
          ...session,
          isArrived: true,
        });
      })
      .catch((err) => {
        showAlert("error", "Error marking as arrived.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div style={{ width: "500px" }}>
      <div>
        <div>
          <small className="text-secondary">Doctor's name</small>
        </div>
        <div>
          <strong>
            {session.doctor.fname} {session.doctor.mname} {session.doctor.lname}
          </strong>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <div>
          <small className="text-secondary">Clinic</small>
        </div>
        <div>
          <strong>{session.clinic.name}</strong>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Active patients</small>
          </div>
          <div>
            <strong>{session.activePatients}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Maximum patients</small>
          </div>
          <div>
            <strong>{session.noOfPatients}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Date</small>
          </div>
          <div>
            <strong>{session.date}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Time</small>
          </div>
          <div>
            <strong>
              {convertTimeFormat(session.timeFrom)} -{" "}
              {convertTimeFormat(session.timeTo)}
            </strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Refundable appointments</small>
          </div>
          <div>
            <strong>{session.isRefundable ? "Yes" : "No"}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Doctor's Fee</small>
          </div>
          <div>
            <strong>Rs. {session.docFee}</strong>
          </div>
        </div>
      </div>
      {session.isCancelled && (
        <div className="mt-4" style={{ color: "red", fontSize: "18px" }}>
          This session is cancelled by the {session.cancelledByType}
        </div>
      )}
      {type === "clinic" && !session.isCancelled && (
        <div className="d-flex justify-content-end mt-3">
          {session.isArrived ? (
            <span
              style={{
                margin: "20px",
                backgroundColor: "green",
                fontSize: "15px",
                color: "white",
                padding: "5px 15px",
                borderRadius: "20px",
              }}
            >
              Doctor has arrived
            </span>
          ) : isLoading ? (
            <Loader2 />
          ) : (
            <Button text="Mark as arrived" onClick={onMarkAsArrived} />
          )}
        </div>
      )}
    </div>
  );
}
