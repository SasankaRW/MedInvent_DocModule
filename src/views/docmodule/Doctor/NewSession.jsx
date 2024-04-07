import { MenuItem, Select } from "@mui/material";
import Title from "../../../Components/Title";
import styles from "./NewSession.module.css";
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

const clinics = [
  {
    name: "First Street Clinic",
    clinic_id: "baa6193f-6423-4612-924b-7c0ebdc5c105",
  },
  {
    name: "Healthy Hearts Clinic",
    clinic_id: "f17c34f1-bbc3-48f0-b12e-19f144f9446d",
  },
  {
    name: "Sunshine Clinic",
    clinic_id: "4ea0ad33-40e9-46d8-8166-5f79ace0199d",
  },
  {
    name: "Green Meadows Clinic",
    clinic_id: "70670a79-2f0a-4c7a-8fc0-c8a097304524",
  },
  {
    name: "Bright Eyes Clinic",
    clinic_id: "b41d25bf-a62b-4b11-a6b4-0c81e43ca96b",
  },
  {
    name: "Friendly Family Clinic",
    clinic_id: "87c60e14-9b8c-4fba-ac3d-c5909e492bea",
  },
  {
    name: "Careful Hands Clinic",
    clinic_id: "4b24cbc5-9730-473d-8636-9dfb35fb2f7b",
  },
  {
    name: "Sunny Smiles Clinic",
    clinic_id: "6e269e96-13d0-4bb3-ba4f-3782cb106194",
  },
  {
    name: "Hopeful Health Clinic",
    clinic_id: "17381c99-af2a-41c3-b8c2-20c422cc851f",
  },
  {
    name: "Healing Hands Clinic",
    clinic_id: "f350b4ce-91b2-469a-b67c-4105f18316b9",
  },
];

const initialState = {
  startDate: "",
  endDate: "",
  selectedClinic: "",
  noOfPatients: 0,
  isRefundable: false,
  startTime: "",
  endTime: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "selectedClinic":
      return { ...state, selectedClinic: action.payload };

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
  const doctorName = "Dr Stephen Strange";
  const clinicFee = 800;
  const doctorFee = 2200;
  const doctor_id = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

  const [
    {
      startDate,
      endDate,
      selectedClinic,
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

  function handleSelectedClinic(e) {
    dispatch({ type: "selectedClinic", payload: e.target.value });
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

    const sessionDetails = {
      timeFrom: startTime + ":00",
      timeTo: endTime + ":00",
      sessionDates: sessionDates.sort(),
      noOfPatients: noOfPatients,
      isRefundable: isRefundable,
      clinic_id: selectedClinic,
      doctor_id: doctor_id,
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

      <div className="d-flex bg-white shadow p-1 justify-content-between rounded-5">
        <form action="" className="w-100">
          <div className="p-5">
            <div className="row">
              <div className="col-sm-5">
                <div className={`${styles.gridItem} text-secondary`}>
                  Doctor's Name
                </div>
              </div>
              <div className="col-sm-7">
                <div className={styles.gridItem}>{doctorName}</div>
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
                    {clinics.map((clinic) => (
                      <MenuItem value={clinic.clinic_id} key={clinic.clinic_id}>
                        {clinic.name}
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
                  Rs. {doctorFee}
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
                <div className={styles.gridItem}>Rs. {clinicFee}</div>
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
      </div>
    </div>
  );
}

export default NewSession;
