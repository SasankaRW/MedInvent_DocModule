import { MenuItem, Select } from "@mui/material";
import Title from "../../../Components/MyComponents/Title";
import styles from "../Doctor/NewSession.module.css";
import { useState } from "react";
import MyDatePicker from "../../../Components/MyComponents/MyDatePicker";
import Button from "../../../Components/MyComponents/Button/Button";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import NumberSelect from "../../../Components/MyComponents/NumberSelect/NumberSelect";
import AppointmentDatePicker from "../../../Components/MyComponents/AppointmentDatePicker/AppointmentDatePicker";
import TimePicker from "../../../Components/MyComponents/TimePicker/TimePicker";

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

function NewSession() {
  const clinicName = "First Street Clinic";
  const clinicFee = 800;
  const doctorFee = 2200;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectDoctor, setSelectedDoctor] = useState("--Select doctor--");
  const [noOfPatients, setNoOfPatients] = useState(1);
  const [isRefundable, setIsRefundable] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  function handleSelectedDoctor(e) {
    setSelectedDoctor(e.target.value);
  }

  function handleNoOfPatients(e) {
    setNoOfPatients(Number(e.target.value));
  }

  function handleIsRefundable() {
    setIsRefundable(!isRefundable);
  }

  function handleStartTime(e) {
    setStartTime(e.target.value);
  }

  function handleEndTime(e) {
    setEndTime(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      startDate !== null &&
      endDate !== null &&
      selectDoctor !== "--Select doctor--" &&
      startTime !== "" &&
      endTime !== ""
    ) {
      alert("New schedule added");
    } else {
      alert("please enter details");
    }
  }

  return (
    <div className={styles.main}>
      <Title>New Session</Title>

      <div
        className={`d-flex bg-white shadow p-1 justify-content-between ${styles.content}`}
      >
        <form action="" onSubmit={handleSubmit}>
          <div className="p-4">
            <div className="row">
              <div className="col-sm-5">
                <div className={`${styles.gridItem} ${styles.title}`}>
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
                    value={selectDoctor}
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
                <div className={`${styles.gridItem} ${styles.title}`}>
                  Dates
                </div>
              </div>
              <div className="col-sm-7">
                <div className={styles.gridItem}>
                  <div style={{ display: "flex" }}>
                    <MyDatePicker
                      selectedDate={startDate}
                      setSelectedDate={setStartDate}
                      label={"Start date"}
                    />
                    <MyDatePicker
                      selectedDate={endDate}
                      setSelectedDate={setEndDate}
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
                <div className={`${styles.gridItem} ${styles.title}`}>
                  Doctor's Name
                </div>
              </div>
              <div className="col-sm-7">
                <div className={styles.gridItem}>{clinicName}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-5">
                <div className={`${styles.gridItem} ${styles.title}`}>
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
                <div className={`${styles.gridItem} ${styles.title}`}>
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
                <div className={`${styles.gridItem} ${styles.title}`}>
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
                <div className={`${styles.gridItem} ${styles.title}`}>
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
