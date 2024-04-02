import { MenuItem, Select } from "@mui/material";
import Title from "../../../Components/Title";
import styles from "../Doctor/NewSession.module.css";
import { useReducer } from "react";
import MyDatePicker from "../../../Components/MyDatePicker";
import Button from "../../../Components/Button/Button";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import NumberSelect from "../../../Components/NumberSelect/NumberSelect";
import AppointmentDatePicker from "../../../Components/AppointmentDatePicker/AppointmentDatePicker";
import TimePicker from "../../../Components/TimePicker/TimePicker";

const doctors = [
  "Dr. Emily Watson",
  "Dr. Michael Brown",
  "Dr. Sophia Johnson",
  "Dr. Ethan Smith",
  "Dr. Olivia Jones",
  "Dr. Daniel Lee",
  "Dr. Ava Taylor",
  "Dr. Matthew Martinez",
  "Dr. Isabella Davis",
  "Dr. Lucas Garcia",
];

const initialState = {
  startDate: "",
  endDate: "",
  selectedDoctor: "--Select doctor--",
  noOfPatients: 1,
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

  function handleSelectedDoctor(e) {
    dispatch({ type: "selectedClinic", payload: e.target.value });
  }

  function handleNoOfPatients(e) {
    dispatch({ type: "noOfPatients", payload: e.target.value });
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
      startDate !== null &&
      endDate !== null &&
      selectedDoctor !== "--Select doctor--" &&
      startTime !== "" &&
      endTime !== ""
    ) {
      alert("New schedule added");
      dispatch({ type: "initial" });
    } else {
      alert("please enter details");
    }
  }

  return (
    <div className={styles.main}>
      <Title>New Session</Title>

      <div className="d-flex bg-white shadow p-1 justify-content-between rounded-5">
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
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      borderRadius: "20px",
                      height: "40px",
                      padding: "0 10px",
                    }}
                    fullWidth
                    value={selectedDoctor}
                    onChange={handleSelectedDoctor}
                  >
                    {["--Select doctor--", ...doctors].map((c) => (
                      <MenuItem value={c} key={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ margin: "0 30px" }}>
                    <Button text={"Add"} />
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
                      selectedDate={startDate}
                      handleDateChange={handleStartDate}
                      label={"Start date"}
                      minDate={new Date().toISOString().split("T")[0]}
                    />
                    <MyDatePicker
                      selectedDate={endDate}
                      handleDateChange={handleEndDate}
                      label={"End date"}
                      minDate={startDate}
                    />
                  </div>
                  <AppointmentDatePicker
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-5">
                <div className={`${styles.gridItem} text-secondary`}>
                  Doctor's Name
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
                    <BorderColorIcon fontSize="small" />
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
                Refundable appointment (Rs. 250 will be extra charged for
                refundable appointments
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
      </div>
    </div>
  );
}

export default NewSession;
