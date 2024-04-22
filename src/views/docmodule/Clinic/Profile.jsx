import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";

import Title from "../../../Components/Title";
import { VisitingElement } from "../../../Components/VisitingElement";
import { Pending } from "../../../Components/Pending";
import { Requested } from "../../../Components/Requested";
import AddDoctorModal from "../../../Components/AddDoctorModal";
import UpdateClinicFeeModal from "../../../Components/UpdateClinicFeeModal";
import Loader from "../../../Components/Loader/Loader";
import { useAuth } from "../../../Contexts/AuthContext";
import { useAlert } from "../../../Contexts/AlertContext";
import config from "../../../config";
import Loader2 from "../../../Components/Loader2/Loader2";

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

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

  const [clinicFee, setClinicFee] = useState(0);
  const [clinic, setClinic] = useState({});
  const [clinicAddress, setClinicAddress] = useState({});
  const [clinicLocation, setClinicLocation] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { showAlert } = useAlert();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${config.baseURL}/clinic/get/${user.id}`)
      .then((res) => {
        setClinic(res.data.data);
        setClinicAddress(res.data.data.clinicAddress);
        setClinicLocation(res.data.data.location);
        setClinicFee(res.data.data.clinicFees);
        setIsLoading(false);
      })
      .catch((err) => {
        showAlert("error", "Error loading profile data");
        console.log("Error getting profile data. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [showAlert, user.id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const convertTime = (time) =>
    new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const mapURL = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3961.3885038149997!2d${clinicLocation[0]}!3d${clinicLocation[1]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTAnMzguMiJOIDc5wrA1NycyMi45IkU!5e0!3m2!1sen!2slk!4v1709995715108!5m2!1sen!2slk`;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Title>Profile</Title>
      <div className="row container">
        <div className="col-lg-6 col-md-6 col-12 bg-white shadow rounded-5 p-2">
          <div className="container p-4">
            <div className="d-flex align-items-center">
              <img src={"/images/dp.png"} alt="" height={80} />
              <div className="mx-4">
                <h3 className="my-0">{clinic.name}</h3>
              </div>
            </div>
          </div>
          <hr className="mx-4 my-0" />
          <div className="container p-4">
            <div className="row mb-3">
              <div className="col-4 text-muted">Address</div>
              <div className="col-8">
                {clinicAddress.lineOne}, {clinicAddress.lineTwo},{" "}
                {clinicAddress.city}, {clinicAddress.district}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Email Address</div>
              <div className="col-8">{clinic.email}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Contact Number</div>
              <div className="col-8">{clinic.contactNo}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Open Hours</div>
              <div className="col-8">
                {convertTime(clinic.openHoursFrom)} to{" "}
                {convertTime(clinic.openHoursTo)}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Clinic Fees</div>
              <div className="col-8 d-flex">
                <span>
                  {clinicFee === null ? "Set clinic fee" : `Rs. ${clinicFee}`}
                </span>
                <span>
                  <UpdateClinicFeeModal
                    setClinicFee={setClinicFee}
                    id={user.id}
                  />
                </span>
              </div>
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
            <AddedTab userId={user.id} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PendingTab userId={user.id} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <RequestsTab userId={user.id} />
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
}

function AddedTab({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [addedDoctors, setAddedDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.baseURL}/visiting/clinic/get/allvisitings/${userId}`)
      .then((res) => {
        setAddedDoctors(res.data.data);
      })
      .catch((err) => {
        console.log("Error getting pending doctors. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return (
      <div className="mt-5">
        <Loader2 />
      </div>
    );
  }
  return (
    <div style={{ maxHeight: "60vh", scrollbarWidth: "thin" }}>
      {addedDoctors.map((doctor) => (
        <VisitingElement
          item={doctor}
          key={doctor.doctor_id}
          setAddedClinics={setAddedDoctors}
          type="doctor"
        />
      ))}
    </div>
  );
}

function PendingTab({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDoctors, setPendingDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.baseURL}/visiting/clinic/get/pendingvisitings/${userId}`)
      .then((res) => {
        setPendingDoctors(res.data.data);
      })
      .catch((err) => {
        console.log("Error getting pending doctors. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return (
      <div className="mt-5">
        <Loader2 />
      </div>
    );
  }

  return (
    <>
      {pendingDoctors.map((doctor) => (
        <Pending item={doctor} type="doctor" key={doctor.doctor_id} />
      ))}
    </>
  );
}

function RequestsTab({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [requestedDoctors, setRequestedDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.baseURL}/visiting/clinic/get/requests/${userId}`)
      .then((res) => {
        setRequestedDoctors(res.data.data);
      })
      .catch((err) => {
        console.log("Error getting pending doctors. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return (
      <div className="mt-5">
        <Loader2 />
      </div>
    );
  }

  return (
    <>
      {requestedDoctors.map((doctor) => (
        <Requested
          item={doctor}
          type="doctor"
          key={doctor.doctor_id}
          setRequestedClinics={setRequestedDoctors}
          userId={userId}
        />
      ))}
    </>
  );
}

export default Profile;
