import Title from "../../../Components/Title";
import AddClinicModal from "../../../Components/AddClinicModal";
import { useState } from "react";
import { VisitingElement } from "../../../Components/VisitingElement";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Pending } from "../../../Components/Pending";
import { Requested } from "../../../Components/Requested";

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
    name: "Green Valley Healthcare",
    doctorFee: 2000,
  },
  {
    name: "City Medical Center",
    doctorFee: 1800,
  },
  {
    name: "Sunrise Wellness Clinic",
    doctorFee: 2200,
  },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile() {
  const [visitingClinics, setVisitingClinics] = useState(clinics);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              <AddClinicModal />
            </div>
          </div>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="my-0 mx-4"
          >
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Added" {...a11yProps(0)} />
              <Tab label="Pending" {...a11yProps(1)} />
              <Tab label="Requests" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div style={{ maxHeight: "60vh", scrollbarWidth: "thin" }}>
              {visitingClinics.map((clinic) => (
                <VisitingElement
                  item={clinic}
                  key={clinic.name}
                  type="doctor"
                />
              ))}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {visitingClinics.map((clinic) => (
              <Pending item={clinic} key={clinic.name} />
            ))}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {visitingClinics.map((clinic) => (
              <Requested item={clinic} key={clinic.name} />
            ))}
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
}

export default Profile;
