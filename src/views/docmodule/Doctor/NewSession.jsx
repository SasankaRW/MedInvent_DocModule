import { MenuItem, Select } from "@mui/material";
import Title from "../../../Components/Title";
import styles from "./NewSession.module.css";
import { useEffect, useReducer, useState } from "react";
import MyDatePicker from "../../../Components/MyDatePicker";
import Button from "../../../Components/Button/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NumberSelect from "../../../Components/NumberSelect/NumberSelect";
import AppointmentDatePicker from "../../../Components/AppointmentDatePicker/AppointmentDatePicker";
import TimePicker from "../../../Components/TimePicker/TimePicker";
import axios from "axios";
import Loader from "../../.././Components/Loader/Loader";
import { useAlert } from "../../../Contexts/AlertContext";
import { motion } from "framer-motion";
import { useAuth } from "../../../Contexts/AuthContext";
import config from "../../../config";

const initialState = {
  startDate: "",
  endDate: "",
  selectedClinicr: "",
  docFee: 0,
  clinicFee: 0,
  noOfPatients: 0,
  isRefundable: false,
  startTime: "",
  endTime: "",
  scheduledBy: "doctor",
};

function reducer(state, action) {
  switch (action.type) {
    case "selectedClinic":
      return {
        ...state,
        selectedClinic: action.payload,
        docFee: action.docfee,
        clinicFee: action.clinicFee,
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

    case "initial":
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
      selectedClinic,
      docFee,
      clinicFee,
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
  const [visitingClinics, setVisitingClinics] = useState([]);
  const { showAlert } = useAlert();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${config.baseURL}/visiting/doctor/get/allvisitings/${user.id}`)
      .then((res) => {
        setVisitingClinics(res.data.data);
      })
      .catch((err) => {
        showAlert("error", "Error loading visiting doctors");
        console.log("Error getting visiting doctors. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [showAlert, user.id]);

  function handleSelectedClinic(e) {
    const selectedClinicId = e.target.value;
    const clinic = visitingClinics.find(
      (clinic) => clinic.clinic_id === selectedClinicId
    );
    dispatch({
      type: "selectedClinic",
      payload: selectedClinicId,
      docfee: clinic.docFee,
      clinicFee: parseFloat(clinic.clinic.clinicFees),
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
      selectedClinic === "" ||
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
      showAlert("error", "Clinic Fee is not set for the selected doctor");
      return;
    }

    const sessionDetails = {
      timeFrom: startTime + ":00",
      timeTo: endTime + ":00",
      sessionDates: sessionDates.sort(),
      noOfPatients: parseInt(noOfPatients),
      isRefundable: isRefundable,
      clinic_id: selectedClinic,
      doctor_id: user.id,
      docFee: parseFloat(docFee),
      clinicFee: parseFloat(clinicFee),
      scheduledBy,
    };

    setIsLoading(true);

    axios
      .post("http://localhost:8080/doctor/newsession", sessionDetails)
      .then((response) => {
        showAlert("success", "New sesssion scheduled successfully.");
        dispatch({ type: "initState" });
      })
      .catch((error) => {
        console.error("Error adding pharmacy:", error);
        showAlert("error", "Error scheduling the session.");
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
        <form action="" className="w-100">
          <div className="p-5">
            <div className="row">
              <div className="col-sm-5">
                <div className={`${styles.gridItem} text-secondary`}>
                  Doctor's Name
                </div>
              </div>
              <div className="col-sm-7">
                <div className={styles.gridItem}>{user.name}</div>
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
                <div className={`${styles.gridItem} d-flex`}>
                  <Select
                    sx={{
                      borderRadius: "20px",
                      height: "40px",
                      padding: "0 10px",
                    }}
                    fullWidth
                    value={selectedClinic}
                    onChange={handleSelectedClinic}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select a clinic
                    </MenuItem>
                    {visitingClinics.map((clinic) => (
                      <MenuItem value={clinic.clinic_id} key={clinic.clinic_id}>
                        {clinic.clinic.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ margin: "0 30px" }}>
                    <Button
                      text={"Add"}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </div>
                </div>
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
                  Doctor's fee
                </div>
              </div>
              <div className="col-sm-7">
                <div className={styles.gridItem}>
                  {docFee === null ? "Not set" : "Rs. " + docFee}
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "none",
                      marginLeft: "20px",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <BorderColorIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-5">
                <div className={`${styles.gridItem} text-secondary`}>
                  Clinic fee
                </div>
              </div>
              <div className="col-sm-7">
                <div className={styles.gridItem}>
                  {clinicFee === null ? "Not set" : "Rs. " + clinicFee}
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
                Refundable appointment (Rs. 250 will be extra charged for
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
        </form>
        <div className={`${styles.image} d-none d-lg-flex align-items-end`}>
          <img src="../../images/newsession.png" alt="img" height={300} />
        </div>
      </motion.div>
    </div>
  );
}

export default NewSession;
