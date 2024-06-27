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
import { useAuth } from "../../../Contexts/AuthContext";
import { useAlert } from "../../../Contexts/AlertContext";
import config from "../../../config";
import Loader2 from "../../../Components/Loader2/Loader2";
import { motion } from "framer-motion";
import Button from "../../../Components/Button/Button";

function Profile() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const convertTime = (time) =>
    new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  async function onPasswordReset() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${config.baseURL}/user/resetpassword/${user.clinic_id}`
      );

      showAlert("success", "Password reset email sent");
    } catch (error) {
      showAlert("error", "Failed to send password reset email");
    } finally {
      setIsLoading(false);
    }
  }

  const mapURL = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3961.3885038149997!2d${user.location.coordinates[0]}!3d${user.location.coordinates[1]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTAnMzguMiJOIDc5wrA1NycyMi45IkU!5e0!3m2!1sen!2slk!4v1709995715108!5m2!1sen!2slk`;

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
                <h3 className="my-0">{user.name}</h3>
              </div>
            </div>
          </div>
          <hr className="mx-4 my-0" />
          <div className="container p-4">
            <div className="row mb-3">
              <div className="col-4 text-muted">Address</div>
              <div className="col-8">
                {user.clinicAddress.lineOne}, {user.clinicAddress.lineTwo},{" "}
                {user.clinicAddress.city}, {user.clinicAddress.district}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Email Address</div>
              <div className="col-8">{user.email}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Contact Number</div>
              <div className="col-8">{user.contactNo}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Open Hours</div>
              <div className="col-8">
                {convertTime(user.openHoursFrom)} to{" "}
                {convertTime(user.openHoursTo)}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Clinic Fees</div>
              <div className="col-8 d-flex">
                <span>
                  {user.clinicFees === null
                    ? "Set clinic fee"
                    : `Rs. ${user.clinicFees}`}
                </span>
                <span>
                  <UpdateClinicFeeModal id={user.clinic_id} />
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
            <AddedTab userId={user.clinic_id} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PendingTab userId={user.clinic_id} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <RequestsTab userId={user.clinic_id} />
          </CustomTabPanel>
        </div>
      </motion.div>
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
    <div
      style={{ maxHeight: "60vh", scrollbarWidth: "thin", overflowY: "auto" }}
    >
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
    <div
      style={{ maxHeight: "60vh", scrollbarWidth: "thin", overflowY: "auto" }}
    >
      {pendingDoctors.map((doctor) => (
        <Pending item={doctor} type="doctor" key={doctor.doctor_id} />
      ))}
    </div>
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
    <div
      style={{ maxHeight: "60vh", scrollbarWidth: "thin", overflowY: "auto" }}
    >
      {requestedDoctors.map((doctor) => (
        <Requested
          item={doctor}
          type="doctor"
          key={doctor.doctor_id}
          setRequestedClinics={setRequestedDoctors}
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
