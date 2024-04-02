import Button from "./Button/Button";

export function SessionDetailsModal({ session, type }) {
  return (
    <div style={{ width: "500px" }}>
      <div>
        <div>
          <small className="text-secondary">Doctor's name</small>
        </div>
        <div>
          <strong>{session.doctor}</strong>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <div>
          <small className="text-secondary">Clinic</small>
        </div>
        <div>
          <strong>{session.clinic}</strong>
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
            <strong>{session.maxPatients}</strong>
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
            <strong>{session.time}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Redundable appointments</small>
          </div>
          <div>
            <strong>{session.isRefundableAppointments ? "Yes" : "No"}</strong>
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
      {type === "upcoming" && (
        <div className="text-end mt-5">
          <span className="mx-2">
            <Button text="Reschedule" />
          </span>
          <Button text="Cancel session" />
        </div>
      )}
    </div>
  );
}
