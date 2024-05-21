import { MenuItem, Select } from "@mui/material";
import Title from "../../../Components/Title";
import styles from "../Doctor/NewSession.module.css";
import { useReducer, useState } from "react";
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

const doctors = [
  { name: "Dr. Emily Watson", doctor_id: 1 },
  { name: "Dr. Michael Brown", doctor_id: 2 },
  { name: "Dr. Sophia Johnson", doctor_id: 3 },
  { name: "Dr. Ethan Smith", doctor_id: 4 },
  { name: "Dr. Olivia Jones", doctor_id: 5 },
  { name: "Dr. Daniel Lee", doctor_id: 6 },
  { name: "Dr. Ava Taylor", doctor_id: 7 },
  { name: "Dr. Matthew Martinez", doctor_id: 8 },
  { name: "Dr. Isabella Davis", doctor_id: 9 },
  { name: "Dr. Lucas Garcia", doctor_id: 10 },
];

const initialState = {
  startDate: "",
  endDate: "",
  selectedDoctor: "",
  noOfPatients: 0,
  isRefundable: false,
  startTime: "",
  endTime: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "selectedDoctor":
      return { ...state, selectedDoctor: action.payload };

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
  const clinicName = "First Street Clinic";
  const clinicFee = 800;
  const doctorFee = 2200;
  const clinic_id = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

  const [
    {
      startDate,
      endDate,
      selectedDoctor,
      noOfPatients,
      isRefundable,
      startTime,
      endTime,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [sessionDates, setSessionDates] = useState([]);

  const { showAlert } = useAlert();

  function handleSelectedDoctor(e) {
    dispatch({ type: "selectedDoctor", payload: e.target.value });
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

    const sessionDetails = {
      timeFrom: startTime + ":00",
      timeTo: endTime + ":00",
      sessionDates: sessionDates.sort(),
      noOfPatients: noOfPatients,
      isRefundable: isRefundable,
      clinic_id: clinic_id,
      doctor_id: selectedDoctor,
    };
    setIsLoading(true);

    axios
      .post("http://localhost:8080/clinic/newsession", sessionDetails)
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
        <form action="" onSubmit={handleSubmit} className="w-100">
          <div className="p-5">
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
                    {doctors.map((doctor) => (
                      <MenuItem value={doctor.doctor_id} key={doctor.doctor_id}>
                        {doctor.name}
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
                <div className={styles.gridItem}>{clinicName}</div>
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
                    <BorderColorIcon
                      fontSize="small"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
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
                <div className={styles.gridItem}>Rs. {doctorFee}</div>
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
                Accept refundable appointments (Rs. 250 will be extra charged
                for refundable appointments
              </span>
            </div>
            <div
              style={{
                height: "40px",
                margin: "30px 30px 0 0",
                textAlign: "end",
              }}
            >
              <Button text={"Schedule"} />
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
