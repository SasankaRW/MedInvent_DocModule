import * as React from "react";

export function PharmacyNClinicDetailsModal({ row, type }) {
  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${hours12}.${formattedMinutes} ${period}`;

    return formattedTime;
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
    </div>
  );
}
