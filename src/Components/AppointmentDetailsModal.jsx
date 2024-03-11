export function AppointmentDetailsModal({ appointment }) {
  return (
    <div style={{ width: "500px" }}>
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Patient's name</small>
          </div>
          <div>
            <strong>{appointment.patient}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Doctor's name</small>
          </div>
          <div>
            <strong>{appointment.doctor}</strong>
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
            <strong>{appointment.date}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Time</small>
          </div>
          <div>
            <strong>{appointment.time}</strong>
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
            <strong>{appointment.mobileNo}</strong>
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
            <strong>Rs. {appointment.area}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <div>
          <small className="text-secondary">NIC</small>
        </div>
        <div>
          <strong>{appointment.nic}</strong>
        </div>
      </div>
    </div>
  );
}
