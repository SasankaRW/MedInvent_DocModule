export function DoctorDetailsModal({ doctor }) {
  return (
    <div style={{ width: "500px" }}>
      <div className="d-flex align-items-center">
        <img src="/images/dp.png" alt="" height={80} />
        <div className="mx-4">
          <div className="h5 my-0">
            {doctor.fname} {doctor.mname} {doctor.lname} <br />
            <small className="text-muted">{doctor.specialization}</small>
          </div>
          <div>{doctor.specialty}</div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Date of Birth</small>
          </div>
          <div>
            <strong>{doctor.dob}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Gender</small>
          </div>
          <div>
            <strong>{doctor.gender}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">NIC Number</small>
          </div>
          <div>
            <strong>{doctor.nic}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Medical License Number</small>
          </div>
          <div>
            <strong>{doctor.medical_license_no}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div className="col-6">
          <div>
            <small className="text-secondary">Contact Number</small>
          </div>
          <div>
            <strong>{doctor.contactNo}</strong>
          </div>
        </div>
        <div className="col-6">
          <div>
            <small className="text-secondary">Email Address</small>
          </div>
          <div>
            <strong>{doctor.email}</strong>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="row">
        <div>
          <small className="text-secondary">Special Notes</small>
        </div>
        <div>
          <strong>{doctor.note ? doctor.note : "N/A"}</strong>
        </div>
      </div>
    </div>
  );
}
