import { Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Title from "../../../Components/MyComponents/Title";
import styles from "./NewAppointment.module.css";
import MyDatePicker from "../../../Components/MyComponents/MyDatePicker";
import { useReducer, useState } from "react";
import Button from "../../../Components/MyComponents/Button/Button";

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
  doctor: "",
  date: null,
  apppointmentNo: 0,
  title: "Mr.",
  patientName: "",
  mobileNumber: "",
  emailAddress: "",
  area: "",
  nic: "",
  isRefundable: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "doctor":
      return { ...state, doctor: action.payload };

    case "date":
      return { ...state, date: action.payload };

    case "appointmentNo":
      return { ...state, apppointmentNo: action.payload };

    case "title":
      return { ...state, title: action.payload };

    case "PatientName":
      return { ...state, patientName: action.payload };

    case "mobileNumber":
      return { ...state, mobileNumber: action.payload };

    case "emailAddress":
      return { ...state, emailAddress: action.payload };

    case "area":
      return { ...state, area: action.payload };

    case "nic":
      return { ...state, nic: action.payload };

    case "isRefundable":
      return { ...state, isRefundable: !state.isRefundable };

    default:
      throw Error("Invalid");
  }
}

function NewAppointment() {
  const [
    {
      doctor,
      date,
      apppointmentNo,
      title,
      patientName,
      mobileNumber,
      emailAddress,
      area,
      nic,
      isRefundable,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleDate(e) {
    dispatch({ type: "date", payload: e.target.value });
  }

  function handleTitle(e) {
    dispatch({ type: "title", payload: e.target.value });
  }

  function handlePatientName(e) {
    dispatch({ type: "PatientName", payload: e.target.value });
  }

  function handleMobileNumber(e) {
    const mobileNo = e.target.value.replace(/[^0-9]/g, "");
    dispatch({ type: "mobileNumber", payload: Number(mobileNo) });
  }

  function handleEmailAddress(e) {
    dispatch({ type: "emailAddress", payload: e.target.value });
  }

  function handleArea(e) {
    dispatch({ type: "area", payload: e.target.value });
  }

  function handleNic(e) {
    dispatch({ type: "nic", payload: e.target.value });
  }

  function handleIsRefundable() {
    dispatch({ type: "isRefundable" });
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.main}>
      <Title>New Appointment</Title>
      <div className="shadow bg-white rounded-5 p-5">
        <form action="" onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6 col-sm-12 mb-4">
              <InputLabel className="mb-2">Doctor's Name</InputLabel>
              <SearchComponent dispatch={dispatch} doctors={doctors} />
            </div>
            <div className="col-md-6 col-sm-12 mb-4">
              <InputLabel className="mb-2">Date</InputLabel>
              <MyDatePicker selectedDate={date} handleDateChange={handleDate} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12 mb-4">
              <InputLabel className="mb-2">Time</InputLabel>
            </div>
            <div className="col-md-6 col-sm-12 mb-4">
              <InputLabel className="mb-2">Appointment number</InputLabel>
              <span className="border px-3 py-1 rounded-5">
                {apppointmentNo}
              </span>
            </div>
          </div>

          <hr className="mb-5" />

          <div className="row">
            <div className="col-md-6 col-sm-12 mb-4">
              <InputLabel className="mb-2">Patient's Name</InputLabel>

              <Select
                className="p-0 rounded-5 col-2"
                value={title}
                onChange={handleTitle}
                displayEmpty
                sx={{
                  borderRadius: "20px",
                  height: "40px",
                  padding: "0 10px",
                  width: "80px",
                }}
              >
                {["Mr.", "Mrs.", "Ms."].map((x) => (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                value={patientName}
                onChange={handlePatientName}
                className="col-8 mx-3"
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    padding: 0,
                    height: "40px",
                  },
                }}
              />
            </div>
            <div className="col-md-6 col-sm-12 mb-4">
              <InputLabel className="mb-2" value={"aefaef"}>
                Mobile Number
              </InputLabel>
              <TextField
                value={mobileNumber}
                onChange={handleMobileNumber}
                className="col-10"
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    padding: 0,
                    height: "40px",
                  },
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <InputLabel className="mb-2">Email Address</InputLabel>
              <TextField
                value={emailAddress}
                onChange={handleEmailAddress}
                className="col-11"
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    padding: 0,
                    height: "40px",
                  },
                }}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-5">
                  <InputLabel className="mb-2">Area</InputLabel>
                  <TextField
                    value={area}
                    onChange={handleArea}
                    InputProps={{
                      style: {
                        borderRadius: "50px",
                        padding: 0,
                        height: "40px",
                      },
                    }}
                  />
                </div>
                <div className="col-5">
                  <InputLabel className="mb-2">NIC</InputLabel>
                  <TextField
                    value={nic}
                    onChange={handleNic}
                    InputProps={{
                      style: {
                        borderRadius: "50px",
                        padding: 0,
                        height: "40px",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="mt-4"
            onClick={handleIsRefundable}
            style={{ cursor: "pointer" }}
          >
            <input
              type="checkbox"
              style={{ marginRight: "10px" }}
              checked={isRefundable}
            />
            <span>
              Refundable appointment (Rs. 250 will be extra charged for
              refundable appointments
            </span>
          </div>
          <div className="text-end col-11 mt-2">
            <Button text="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAppointment;

const SearchComponent = ({ dispatch, doctors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  let filteredData = doctors.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredData);

  const handleSelectItem = (item) => {
    dispatch({ type: "doctor", payload: item });
    setSearchTerm(item);
    setShowResults(false);
  };

  return (
    <div>
      <TextField
        placeholder="Search for the doctor"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowResults(true);
        }}
        className="col-10"
        InputProps={{
          style: {
            borderRadius: "50px",
            padding: 0,
            height: "40px",
          },
        }}
      />
      {searchTerm && showResults && (
        <div className={styles.results}>
          {filteredData.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(item)}
              style={{ cursor: "pointer", padding: "0 10px" }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
