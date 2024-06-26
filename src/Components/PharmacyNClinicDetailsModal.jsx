import * as React from "react";
import { LineWave } from "react-loader-spinner";
import { useAlert } from "../Contexts/AlertContext";
import axios from "axios";
import config from "../config";

export function PharmacyNClinicDetailsModal({ row, type }) {
  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${hours12}.${formattedMinutes} ${period}`;

    return formattedTime;
  }

  const [isLoading, setIsLoading] = React.useState(false);
  const { showAlert } = useAlert();

  async function onPasswordReset() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${config.baseURL}/user/resetpassword/${row.clinic_id}`
      );

      showAlert("success", "Password reset email sent");
    } catch (error) {
      showAlert("error", "Failed to send password reset email");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ width: "500px" }}>
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">
              {type === "pharmacy" && "Pharmacy Name"}
              {type === "clinic" && "Clinic Name"}
            </small>
          </div>
          <div>
            <strong>{row.name}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Contact Number</small>
          </div>
          <div>
            <strong>{row.contactNo}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div>
          <small className="text-secondary">Address</small>
        </div>
        <div>
          {type === "pharmacy" && (
            <strong>
              {row.pharmacyAddress.lineOne +
                ", " +
                row.pharmacyAddress.lineTwo +
                ", " +
                row.pharmacyAddress.city +
                ", " +
                row.pharmacyAddress.district}
            </strong>
          )}
          {type === "clinic" && (
            <strong>
              {row.clinicAddress.lineOne +
                ", " +
                row.clinicAddress.lineTwo +
                ", " +
                row.clinicAddress.city +
                ", " +
                row.clinicAddress.district}
            </strong>
          )}
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Open days</small>
          </div>
          <div>
            <strong>{row.openDays.join(", ")}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Open Hours</small>
          </div>
          <div>
            <strong>
              {formatTime(row.openHoursFrom)} to {formatTime(row.openHoursTo)}
            </strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div>
          <small className="text-secondary">Email </small>
        </div>
        <div>
          <strong>{row.email}</strong>
        </div>
      </div>
      {type === "clinic" &&
        (isLoading ? (
          <LineWave
            visible={true}
            color="#0c6af3"
            wrapperStyle={{}}
            wrapperClass="d-flex justify-content-end"
          />
        ) : (
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary" onClick={onPasswordReset}>
              Send password reset email
            </button>
          </div>
        ))}
    </div>
  );
}
