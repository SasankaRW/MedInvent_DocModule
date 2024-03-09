import { IconButton } from "@mui/material";
import Button from "../../../Components/MyComponents/Button/Button";
import Title from "../../../Components/MyComponents/Title";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClinicSearchModal from "../../../Components/ClinicSearchModal";
import { useState } from "react";

const doctorInfo = {
  name: "Dr. John Doe",
  specialty: "Cardiologist",
  nic: "123456789V",
  medicalLicenseNo: "MED123456",
  email: "dr.johndoe@example.com",
  contactNo: "+1234567890",
  gender: "Male",
  dob: "1970-01-01",
};

const clinics = [
  {
    clinicName: "Green Valley Healthcare",
    doctorFee: 2000,
  },
  {
    clinicName: "City Medical Center",
    doctorFee: 1800,
  },
  {
    clinicName: "Sunrise Wellness Clinic",
    doctorFee: 2200,
  },
];

function Profile() {
  const [visitingClinics, setVisitingClinics] = useState(clinics);

  return (
    <div>
      <Title>Profile</Title>
      <div className="row container">
        <div className="col-lg-6 col-md-6 col-12 bg-white shadow rounded-5 p-2">
          <div className="container p-4">
            <div className="d-flex align-items-center">
              <img src={"/images/dp.png"} alt="" height={80} />
              <div className="mx-4">
                <h3 className="my-0">{doctorInfo.name}</h3>
                <div>{doctorInfo.specialty}</div>
              </div>
            </div>
          </div>
          <hr className="mx-4 my-0" />
          <div className="container p-4">
            <div className="row mb-3">
              <div className="col-4 text-muted">NIC</div>
              <div className="col-8">{doctorInfo.nic}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Medical license No.</div>
              <div className="col-8">{doctorInfo.medicalLicenseNo}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Email address</div>
              <div className="col-8">d{doctorInfo.email}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Contact number</div>
              <div className="col-8">{doctorInfo.contactNo}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Gender</div>
              <div className="col-8">{doctorInfo.gender}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Date of Birth</div>
              <div className="col-8">{doctorInfo.dob}</div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-12 bg-white shadow rounded-5 p-2 mx-md-4 mt-md-0 mt-sm-3 mt-3">
          <div className="container p-4 d-flex align-items-center justify-content-between">
            <div className="lead">Visiting Clinics</div>
            <div>
              <ClinicSearchModal
                setVisitingClinics={setVisitingClinics}
                visitingClinics={visitingClinics}
              />
            </div>
          </div>
          <hr className="my-0 mx-4" />
          <div
            className="container p-4 overflow-y-auto"
            style={{ maxHeight: "60vh", scrollbarWidth: "thin" }}
          >
            {visitingClinics.map((clinic) => (
              <VisitingClinicElement clinic={clinic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

function VisitingClinicElement({ clinic }) {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 rounded-4 mb-2"
      style={{
        backgroundColor: "#edf8ff",
      }}
    >
      <div>
        <div style={{ fontSize: "18px" }}>{clinic.clinicName}</div>
        <div className="mt-1 d-flex align-items-center">
          Doctor fee : Rs.{" "}
          <span>
            <b>{clinic.doctorFee}</b>
          </span>
          <IconButton disableFocusRipple disableRipple>
            <BorderColorIcon
              fontSize="small"
              className="mx-3"
              style={{ color: "gray" }}
            />
          </IconButton>
        </div>
      </div>
      <div>
        <IconButton>
          <DeleteOutlineIcon fontSize="medium" style={{ color: "gray" }} />
        </IconButton>
      </div>
    </div>
  );
}
