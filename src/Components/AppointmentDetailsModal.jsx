import { useState } from "react";
import Button from "./Button/Button";
import axios from "axios";
import config from "../config";
import { useAlert } from "../Contexts/AlertContext";
import Loader2 from "./Loader2/Loader2";
import { useAuth } from "../Contexts/AuthContext";

export function AppointmentDetailsModal({
  appointment,
  updateAppointmentStatus,
  type,
}) {
  const [isPaidLoading, setIsPaidLoading] = useState(false);
  const [isAttendedLoading, setIsAttendedLoading] = useState(false);
  const [isCancelledLoading, setIsCancelledLoading] = useState(false);

  const { showAlert } = useAlert();

  const { user } = useAuth();

  function convertTimeFormat(time) {
    let [hours, minutes, seconds] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    return `${hours}:${minutes} ${period}`;
  }

  function onMarkAsPaid() {
    setIsPaidLoading(true);
    axios
      .get(
        `${config.baseURL}/appointment/mark/paid/${appointment.appointment_id}`
      )
      .then((res) => {
        showAlert("success", "Marked as paid.");
        updateAppointmentStatus({
          ...appointment,
          isPaid: true,
        });
      })
      .catch((err) => {
        showAlert("error", "Error marking as paid.");
      })
      .finally(() => {
        setIsPaidLoading(false);
      });
  }

  function onMarkAsAttended() {
    setIsAttendedLoading(true);
    axios
      .get(
        `${config.baseURL}/appointment/mark/attended/${appointment.appointment_id}`
      )
      .then((res) => {
        showAlert("success", "Marked as attended.");
        updateAppointmentStatus({
          ...appointment,
          isAttended: true,
        });
      })
      .catch((err) => {
        showAlert("error", "Error marking as attended.");
      })
      .finally(() => {
        setIsAttendedLoading(false);
      });
  }

  function onCancel() {
    setIsCancelledLoading(true);
    axios
      .put(
        `${config.baseURL}/appointment/update/cancel/${appointment.appointment_id}`,
        {
          cancelledById: user.clinic_id,
          cancelledByType: "clinic",
        }
      )
      .then((res) => {
        showAlert("success", "Appointment cancelled successfully.");
        updateAppointmentStatus({
          ...appointment,
          isCancelled: true,
          cancelledByType: "clinic",
        });
      })
      .catch((err) => {
        showAlert("error", "Error cancelling the appointment.");
      })
      .finally(() => {
        setIsCancelledLoading(false);
      });
  }

  return (
    <div style={{ width: "500px" }}>
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Patient's name</small>
          </div>
          <div>
            <strong>{appointment.patientName}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Doctor's name</small>
          </div>
          <div>
            <strong>
              {appointment.session.doctor.fname}{" "}
              {appointment.session.doctor.lname}
            </strong>
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
            <strong>{appointment.session.date}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Time</small>
          </div>
          <div>
            <strong>{convertTimeFormat(appointment.session.timeFrom)}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Appointment Number</small>
          </div>
          <div>
            <strong>{appointment.appointmentNo}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Mobile No</small>
          </div>
          <div>
            <strong>{appointment.contactNo}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Email </small>
          </div>
          <div>
            <strong>{appointment.email ? appointment.email : "N/A"}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Area</small>
          </div>
          <div>
            <strong>{appointment.area}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">NIC </small>
          </div>
          <div>
            <strong>{appointment.nic}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Payment status</small>
          </div>
          <div>
            <strong>
              {appointment.isPaid ? (
                <span style={{ color: "green" }}>Paid</span>
              ) : (
                <span style={{ color: "red" }}>Not paid</span>
              )}
            </strong>
          </div>
        </div>
      </div>
      {appointment.isCancelled && (
        <div className="mt-4">
          <div style={{ color: "red", fontSize: "18px" }}>
            This appointment is cancelled by {appointment.cancelledByType}
          </div>
        </div>
      )}
      {type === "upcoming" && (
        <div>
          <div className="d-flex mt-5 justify-content-between">
            <div className="d-flex">
              {!appointment.isPaid && (
                <div>
                  {isPaidLoading ? (
                    <Loader2 />
                  ) : (
                    <Button text={"Mark as paid"} onClick={onMarkAsPaid} />
                  )}
                </div>
              )}
              {!appointment.isAttended && !appointment.isCancelled && (
                <div className={!appointment.isPaid && "mx-2"}>
                  {isAttendedLoading ? (
                    <Loader2 />
                  ) : (
                    <Button
                      text={"Mark as attended"}
                      onClick={onMarkAsAttended}
                    />
                  )}
                </div>
              )}
            </div>
            {!appointment.isCancelled && !appointment.isAttended && (
              <div>
                {isCancelledLoading ? (
                  <Loader2 />
                ) : (
                  <Button text="Cancel" onClick={onCancel} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
