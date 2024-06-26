import { MenuItem, Select } from "@mui/material";
import Title from "../../../Components/Title";
import styles from "../Doctor/NewSession.module.css";
import { useEffect, useReducer, useState } from "react";
import MyDatePicker from "../../../Components/MyDatePicker";
import Button from "../../../Components/Button/Button";
import NumberSelect from "../../../Components/NumberSelect/NumberSelect";
import AppointmentDatePicker from "../../../Components/AppointmentDatePicker/AppointmentDatePicker";
import TimePicker from "../../../Components/TimePicker/TimePicker";
import AddDoctorModal from "../../../Components/AddDoctorModal";
import axios from "axios";
import Loader from "../../.././Components/Loader/Loader";
import { useAlert } from "../../../Contexts/AlertContext";
import { motion } from "framer-motion";
import config from "../../../config";
import { useAuth } from "../../../Contexts/AuthContext";
import UpdateClinicFeeModal from "../../../Components/UpdateClinicFeeModal";

const initialState = {
  startDate: "",
  endDate: "",
  selectedDoctor: "",
  docFee: 0,
  noOfPatients: 0,
  isRefundable: false,
  startTime: "",
  endTime: "",
  scheduledBy: "clinic",
};

function reducer(state, action) {
  switch (action.type) {
    case "selectedDoctor":
      return {
        ...state,
        selectedDoctor: action.payload,
        docFee: action.fee,
      };

    case "startDate":
      return { ...state, startDate: action.payload };

    case "endDate":
      return { ...state, endDate: action.payload };

    case "noOfPatients":
      return { ...state, noOfPatients: action.payload };

    case "isRefundable":
      return { ...state, isRefundable: !state.isRefundable };

    case "startTime":
      return { ...state, startTime: action.payload };

    case "endTime":
      return { ...state, endTime: action.payload };

    case "initState":
      return initialState;

    default:
      throw Error("invalid");
  }
}

function NewSession() {
  const { user } = useAuth();

  const [
    {
      startDate,
      endDate,
      selectedDoctor,
      docFee,
      noOfPatients,
      isRefundable,
      startTime,
      endTime,
      scheduledBy,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [sessionDates, setSessionDates] = useState([]);
  const [visitingDoctors, setVisitingDoctors] = useState([]);
  const { showAlert } = useAlert();

  const [clinicFee, setClinicFee] = useState(user.clinicFee);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${config.baseURL}/visiting/clinic/get/allvisitings/${user.clinic_id}`
      )
      .then((res) => {
        setVisitingDoctors(res.data.data);
      })
      .catch((err) => {
        showAlert("error", "Error loading visiting doctors");
        console.log("Error getting visiting doctors. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.clinic_id]);

  function handleSelectedDoctor(e) {
    const selectedDoctor = e.target.value;
    const doctor = visitingDoctors.find(
      (doc) => doc.doctor_id === selectedDoctor.doctor_id
    );
    dispatch({
      type: "selectedDoctor",
      payload: selectedDoctor,
      fee: doctor.docFee,
    });
  }

  function handleNoOfPatients(e) {
    if (e.target.value >= 0) {
      dispatch({ type: "noOfPatients", payload: e.target.value });
    }
  }

  function handleIsRefundable() {
    dispatch({ type: "isRefundable" });
  }

  function handleStartTime(e) {
    dispatch({ type: "startTime", payload: e.target.value });
  }

  function handleEndTime(e) {
    dispatch({ type: "endTime", payload: e.target.value });
  }

  function handleStartDate(e) {
    dispatch({ type: "startDate", payload: e.target.value });
  }

  function handleEndDate(e) {
    dispatch({ type: "endDate", payload: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      selectedDoctor === "" ||
      startTime === "" ||
      endTime === "" ||
      noOfPatients === 0
    ) {
      showAlert("error", "Please fill all fields");
      return;
    }

    if (sessionDates.length === 0) {
      showAlert("error", "Please select dates");
      return;
    }

    if (docFee === null) {
      showAlert("error", "Doctor Fee is not set for the selected doctor");
      return;
    }

    if (clinicFee === null) {
      showAlert("error", "Clinic Fee is not set");
      return;
    }

    const sessionDetails = {
      doctor_id: selectedDoctor.doctor_id,
      clinic_id: user.clinic_id,
      scheduledById: user.clinic_id,
      scheduledByType: scheduledBy,
      dates: [...sessionDates],
      timeFrom: startTime + ":00",
      timeTo: endTime + ":00",
      noOfPatients: parseInt(noOfPatients),
      docFee: parseFloat(docFee),
      clinicFee: parseFloat(clinicFee),
      isRefundable: isRefundable,
    };

    setIsLoading(true);

    axios
      .post(`${config.baseURL}/session/newsession`, sessionDetails)
      .then((response) => {
        showAlert("success", "New sesssion scheduled successfully.");
        dispatch({ type: "initState" });
      })
      .catch((error) => {
        console.error("Error scheduling the session:", error);
        const errorMessage =
          error.response?.data?.message || "Error scheduling the session.";
        showAlert("error", errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.main}>
      <Title>New Session</Title>

      <motion.div
        className="d-flex bg-white shadow p-1 justify-content-between rounded-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-5 w-100">
          <div className="row">
            <div className="col-sm-5">
              <div className={`${styles.gridItem} text-secondary`}>
                Doctor's Name
              </div>
            </div>
            <div className="col-sm-7">
              <div className={`${styles.gridItem} d-flex`}>
                <Select
                  sx={{
                    borderRadius: "20px",
                    height: "40px",
                    padding: "0 10px",
                  }}
                  fullWidth
                  value={selectedDoctor}
                  onChange={handleSelectedDoctor}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select a doctor
                  </MenuItem>
                  {visitingDoctors.map((doctor) => (
                    <MenuItem value={doctor} key={doctor.doctor_id}>
                      {doctor.doctor.fname} {doctor.doctor.lname}
                    </MenuItem>
                  ))}
                </Select>
                <div style={{ margin: "0 30px", display: "flex" }}>
                  <AddDoctorModal />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-5">
              <div className={`${styles.gridItem} text-secondary`}>Dates</div>
            </div>
            <div className="col-sm-7">
              <div className={styles.gridItem}>
                <div style={{ display: "flex" }}>
                  <MyDatePicker
                    isStart={true}
                    selectedDate={startDate}
                    handleDateChange={handleStartDate}
                    label={"Start date"}
                  />
                  <MyDatePicker
                    selectedDate={endDate}
                    handleDateChange={handleEndDate}
                    label={"End date"}
                    minDate={startDate}
                  />
                </div>
                <AppointmentDatePicker
                  sessionDates={sessionDates}
                  setSessionDates={setSessionDates}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-5">
              <div className={`${styles.gridItem} text-secondary`}>
                Clinic Name
              </div>
            </div>
            <div className="col-sm-7">
              <div className={styles.gridItem}>{user.name}</div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5">
              <div className={`${styles.gridItem} text-secondary`}>
                Time slot
              </div>
            </div>
            <div className="col-sm-7">
              <div className={styles.gridItem} style={{ display: "flex" }}>
                <TimePicker
                  label={"from"}
                  time={startTime}
                  handleTime={handleStartTime}
                />
                <TimePicker
                  label={"to"}
                  time={endTime}
                  handleTime={handleEndTime}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-5">
              <div className={`${styles.gridItem} text-secondary`}>
                Number of patients
              </div>
            </div>
            <div className="col-sm-7">
              <div className={styles.gridItem}>
                <NumberSelect
                  number={noOfPatients}
                  handleNumber={handleNoOfPatients}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-5">
              <div className={`${styles.gridItem} text-secondary`}>
                Clinic fee
              </div>
            </div>
            <div className="col-sm-7">
              <div className={styles.gridItem}>
                Rs. {clinicFee}
                <button
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    marginLeft: "20px",
                  }}
                  onClick={() => {}}
                >
                  <UpdateClinicFeeModal
                    setClinicFee={setClinicFee}
                    id={user.clinic_id}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-5">
              <div className={`${styles.gridItem} text-secondary`}>
                Doctor's fee
              </div>
            </div>
            <div className="col-sm-7">
              <div className={styles.gridItem}>
                {docFee === null ? "Not set" : "Rs. " + docFee}
              </div>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              style={{ marginRight: "10px" }}
              checked={isRefundable}
              onChange={handleIsRefundable}
            />
            <span>
              Accept refundable appointments (Rs. 250 will be extra charged for
              refundable appointments)
            </span>
          </div>
          <div
            style={{
              height: "40px",
              margin: "30px 30px 0 0",
              textAlign: "end",
            }}
          >
            <Button text={"Schedule"} onClick={handleSubmit} />
          </div>
        </div>
        <div className={`${styles.image} d-none d-lg-flex align-items-end`}>
          <img src="../../images/newsession.png" alt="img" height={300} />
        </div>
      </motion.div>
    </div>
  );
}

export default NewSession;
