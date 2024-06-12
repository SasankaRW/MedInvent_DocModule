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
import AddClinicModal from "../../../Components/AddClinicModal";
import axios from "axios";
import Loader from "../../.././Components/Loader/Loader";
import { useAlert } from "../../../Contexts/AlertContext";
import { motion } from "framer-motion";
import { useAuth } from "../../../Contexts/AuthContext";
import config from "../../../config";
import MyModal from "../../../Components/MyModal";
import { UpdateDocFee } from "../../../Components/VisitingElement";

const initialState = {
  startDate: "",
  endDate: "",
  selectedClinic: "",
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
      selectedClinic,
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

  const [docFee, setDocFee] = useState(0);

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
  }, [user.id]);

  function handleSelectedClinic(e) {
    const selectedClinic = e.target.value;
    const clinic = visitingClinics.find(
      (clinic) => clinic.clinic_id === selectedClinic.clinic_id
    );
    dispatch({
      type: "selectedClinic",
      payload: selectedClinic,
      clinicFee: clinic.clinic.clinicFees,
    });
    setDocFee(clinic.docFee);
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

    if (docFee === null || parseInt(docFee) === 0) {
      showAlert("error", "Doctor Fee is not set for the selected doctor");
      return;
    }

    if (clinicFee === null || parseInt(clinicFee) === 0) {
      showAlert("error", "Clinic Fee is not set for the selected doctor");
      return;
    }

    const sessionDetails = {
      doctor_id: user.id,
      clinic_id: selectedClinic.clinic_id,
      scheduledById: user.id,
      scheduledByType: scheduledBy,
      dates: [...sessionDates],
      timeFrom: startTime + ":00",
      timeTo: endTime + ":00",
      noOfPatients: parseInt(noOfPatients),
      clinicFee: parseFloat(clinicFee),
      docFee: parseFloat(docFee),
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

  const handleClose = () => {};

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
                    <MenuItem value={clinic} key={clinic.clinic_id}>
                      {clinic.clinic.name}
                    </MenuItem>
                  ))}
                </Select>
                <div style={{ margin: "0 30px" }}>
                  <AddClinicModal />
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
                >
                  {" "}
                  {selectedClinic !== "" && (
                    <MyModal
                      icon={
                        <BorderColorIcon
                          fontSize="small"
                          className="mx-3"
                          style={{ color: "gray" }}
                        />
                      }
                    >
                      <UpdateDocFee
                        closeModal={handleClose}
                        item={selectedClinic}
                        setDocFee={setDocFee}
                      />
                    </MyModal>
                  )}
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
        <div className={`${styles.image} d-none d-lg-flex align-items-end`}>
          <img src="../../images/newsession.png" alt="img" height={300} />
        </div>
      </motion.div>
    </div>
  );
}

export default NewSession;
