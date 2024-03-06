import { MenuItem, Select } from "@mui/material";
import Title from "../../../Components/MyComponents/Title";
import styles from "./NewSession.module.css";
import { useState } from "react";
import MyDatePicker from "../../../Components/MyComponents/MyDatePicker";
import Button from "../../../Components/MyComponents/Button/Button";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import NumberSelect from "../../../Components/MyComponents/NumberSelect/NumberSelect";
import AppointmentDatePicker from "../../../Components/MyComponents/AppointmentDatePicker/AppointmentDatePicker";

const clinics = [
  "First Street Clinic",
  "Healthy Hearts Clinic",
  "Sunshine Clinic",
  "Green Meadows Clinic",
  "Bright Eyes Clinic",
  "Friendly Family Clinic",
  "Careful Hands Clinic",
  "Sunny Smiles Clinic",
  "Hopeful Health Clinic",
  "Healing Hands Clinic",
];

function NewSession() {
  const doctorName = "Dr Stephen Strange";
  const clinicFee = 800;
  const doctorFee = 2200;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectClinic, setSelectedClinic] = useState(clinics.at(0));
  const [noOfPatients, setNoOfPatients] = useState(1);
  const [isRefundable, setIsRefundable] = useState(false);

  function handleSelectedClinic(e) {
    setSelectedClinic(e.target.value);
  }

  function handleNoOfPatients(e) {
    setNoOfPatients(Number(e.target.value));
  }

  function handleIsRefundable() {
    setIsRefundable(!isRefundable);
  }

  return (
    <div className={styles.main}>
      <Title>New Session</Title>

      <div
        className={`d-flex bg-white shadow p-3 justify-content-between ${styles.content}`}
      >
        <div className="p-4">
          <div className="row">
            <div className="col-sm-5">
              <div className={`${styles.gridItem} ${styles.title}`}>
                Doctor's Name
              </div>
            </div>
            <div className="col-sm-7">
              <div className={styles.gridItem}>{doctorName}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-5">
              <div className={`${styles.gridItem} ${styles.title}`}>Dates</div>
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
                Clinic Name
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
                  value={selectClinic}
                  onChange={handleSelectedClinic}
                >
                  {clinics.map((c) => (
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
                Time slot
              </div>
            </div>
            <div className="col-sm-7">
              <div className={styles.gridItem}>time</div>
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
        <div className={`${styles.image} d-none d-lg-flex align-items-end`}>
          <img src="../../images/newsession.png" alt="img" height={300} />
        </div>
      </div>
    </div>
  );
}

export default NewSession;
