import Title from "../../../Components/Title";
import ClinicSearchModal from "../../../Components/AddClinicModal";
import { useState } from "react";
import { VisitingElement } from "../../../Components/VisitingElement";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Pending } from "../../../Components/Pending";
import { Requested } from "../../../Components/Requested";
import AddDoctorModal from "../../../Components/AddDoctorModal";

let clinicInfo = {
  name: "Example Clinic",
  address: "123 Example Street, City, Country",
  emailAddress: "info@exampleclinic.com",
  contactNumber: "+1234567890",
  openHours: {
    from: "9:00 AM",
    to: "5:00 PM",
  },
  clinicFees: "$50",
  location: {
    lat: 6.794668,
    long: 79.901444,
  },
};

const doctors = [
  {
    name: "Dr. Emily Watson",
    fee: 2000,
  },
  {
    name: "Dr. John Carter",
    fee: 1800,
  },
  {
    name: "Dr. Sarah Lin",
    fee: 2200,
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
  const [visitingDoctors, setVisitingDoctors] = useState(doctors);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mapURL = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3961.3885038149997!2d${clinicInfo.location.long}!3d${clinicInfo.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTAnMzguMiJOIDc5wrA1NycyMi45IkU!5e0!3m2!1sen!2slk!4v1709995715108!5m2!1sen!2slk`;
  return (
    <div>
      <Title>Profile</Title>
      <div className="row container">
        <div className="col-lg-6 col-md-6 col-12 bg-white shadow rounded-5 p-2">
          <div className="container p-4">
            <div className="d-flex align-items-center">
              <img src={"/images/dp.png"} alt="" height={80} />
              <div className="mx-4">
                <h3 className="my-0">{clinicInfo.name}</h3>
              </div>
            </div>
          </div>
          <hr className="mx-4 my-0" />
          <div className="container p-4">
            <div className="row mb-3">
              <div className="col-4 text-muted">Address</div>
              <div className="col-8">{clinicInfo.address}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Email Address</div>
              <div className="col-8">{clinicInfo.emailAddress}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Contact Number</div>
              <div className="col-8">{clinicInfo.contactNumber}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Open Hours</div>
              <div className="col-8">
                {clinicInfo.openHours.from} to {clinicInfo.openHours.to}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Clinic Fees</div>
              <div className="col-8">{clinicInfo.clinicFees}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Location</div>
              <div className="col-8">
                <iframe
                  className="rounded-4"
                  title="map"
                  src={mapURL}
                  width="100%"
                  height="200"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-12 bg-white shadow rounded-5 p-2 mx-md-4 mt-md-0 mt-sm-3 mt-3">
          <div className="container p-4 d-flex align-items-center justify-content-between">
            <div className="lead">Visiting Doctors</div>
            <div>
              <AddDoctorModal />
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
              {visitingDoctors.map((clinic) => (
                <VisitingElement
                  item={clinic}
                  key={clinic.name}
                  type="clinic"
                />
              ))}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {visitingDoctors.map((doctor) => (
              <Pending item={doctor} key={doctor.doctorName} />
            ))}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {visitingDoctors.map((doctor) => (
              <Requested item={doctor} key={doctor.doctorName} />
            ))}
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
}

export default Profile;
