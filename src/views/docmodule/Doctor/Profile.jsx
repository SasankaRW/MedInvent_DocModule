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
import AddClinicModal from "../../../Components/AddClinicModal";
import Loader2 from "../../../Components/Loader2/Loader2";
import { useAuth } from "../../../Contexts/AuthContext";
import { useAlert } from "../../../Contexts/AlertContext";
import config from "../../../config";
import { motion } from "framer-motion";
import Button from "../../../Components/Button/Button";

function Profile() {
  const [value, setValue] = useState(0);
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function onPasswordReset() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${config.baseURL}/user/resetpassword/${user.doctor_id}`
      );

      showAlert("success", "Password reset email sent");
    } catch (error) {
      showAlert("error", "Failed to send password reset email");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Title>Profile</Title>
      <motion.div
        className="row container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="col-lg-6 col-md-6 col-12 bg-white shadow rounded-5 p-2">
          <div className="container p-4">
            <div className="d-flex align-items-center">
              <img src={"/images/dp.png"} alt="" height={80} />
              <div className="mx-4">
                <h3 className="my-0">
                  Dr. {user.fname} {user.mname} {user.lname}
                </h3>
                <div>{user.specialization}</div>
              </div>
            </div>
          </div>
          <hr className="mx-4 my-0" />
          <div className="container p-4">
            <div className="row mb-3">
              <div className="col-4 text-muted">NIC</div>
              <div className="col-8">{user.nic}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Medical license No.</div>
              <div className="col-8">{user.medical_license_no}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Email address</div>
              <div className="col-8">{user.email}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Contact number</div>
              <div className="col-8">{user.contactNo}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Gender</div>
              <div className="col-8">{user.gender}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Date of Birth</div>
              <div className="col-8">{user.dob}</div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              {isLoading ? (
                <Loader2 />
              ) : (
                <Button
                  text={"Request password reset"}
                  onClick={onPasswordReset}
                />
              )}
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
            <AddedTab userId={user.doctor_id} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PendingTab userId={user.doctor_id} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <RequestsTab userId={user.doctor_id} />
          </CustomTabPanel>
        </div>
      </motion.div>
    </div>
  );
}

function AddedTab({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [addedClinics, setAddedClinics] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.baseURL}/visiting/doctor/get/allvisitings/${userId}`)
      .then((res) => {
        setAddedClinics(res.data.data);
      })
      .catch((err) => {
        console.log("Error getting pending clinics. Error:" + err);
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
    <div
      style={{ maxHeight: "60vh", scrollbarWidth: "thin", overflowY: "auto" }}
    >
      {addedClinics.map((clinic) => (
        <VisitingElement
          item={clinic}
          key={clinic.clinic_id}
          setAddedClinics={setAddedClinics}
          type="clinic"
        />
      ))}
    </div>
  );
}

function PendingTab({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingClinics, setPendingClinics] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.baseURL}/visiting/doctor/get/pendingvisitings/${userId}`)
      .then((res) => {
        setPendingClinics(res.data.data);
      })
      .catch((err) => {
        console.log("Error getting pending clinics. Error:" + err);
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
    <div
      style={{ maxHeight: "60vh", scrollbarWidth: "thin", overflowY: "auto" }}
    >
      {pendingClinics.map((clinic) => (
        <Pending item={clinic} type="clinic" key={clinic.clinic_id} />
      ))}
    </div>
  );
}

function RequestsTab({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [requestedClinics, setRequestedClinics] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.baseURL}/visiting/doctor/get/requests/${userId}`)
      .then((res) => {
        setRequestedClinics(res.data.data);
      })
      .catch((err) => {
        console.log("Error getting pending clinics. Error:" + err);
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
    <div
      style={{ maxHeight: "60vh", scrollbarWidth: "thin", overflowY: "auto" }}
    >
      {requestedClinics.map((clinic) => (
        <Requested
          item={clinic}
          type="clinic"
          key={clinic.clinic_id}
          setRequestedClinics={setRequestedClinics}
          userId={userId}
        />
      ))}
    </div>
  );
}

export default Profile;

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
