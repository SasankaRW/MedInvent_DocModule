import * as React from "react";

export function PharmacyNClinicDetailsModal({ row, type }) {
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
            <strong>{row.mobileNo}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div>
          <small className="text-secondary">Address</small>
        </div>
        <div>
          <strong>{row.location}</strong>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Open days</small>
          </div>
          <div>
            <strong>{row.openDays}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Open Hours</small>
          </div>
          <div>
            <strong>
              {row.openHoursFrom} to {row.openHoursTo}
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
