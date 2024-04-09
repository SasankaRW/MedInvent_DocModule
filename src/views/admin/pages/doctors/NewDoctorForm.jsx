import React, { useReducer, useState } from "react";
import Container from "../../../../Components/Container/Container";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import TextArea from "../../../../Components/TextArea/TextArea";
import { doctorSpecializations } from "./data/doctorSpecializations";
import { useAlert } from "../../../../Contexts/AlertContext";
import Loader from "../../../../Components/Loader/Loader";
import axios from "axios";
import config from "../../../../config";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  contactNo: "",
  gender: null,
  nicNo: "",
  email: "",
  password: "",
  dob: null,
  MLNo: "",
  speciality: "",
  note: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "firstName":
      return { ...state, firstName: action.payload };

    case "lastName":
      return { ...state, lastName: action.payload };

    case "middleName":
      return { ...state, middleName: action.payload };

    case "contactNo":
      return { ...state, contactNo: action.payload };

    case "gender":
      return { ...state, gender: action.payload };

    case "nicNo":
      return { ...state, nicNo: action.payload };

    case "email":
      return { ...state, email: action.payload };

    case "password":
      return { ...state, password: action.payload };

    case "dob":
      return { ...state, dob: action.payload };

    case "MLNo":
      return { ...state, MLNo: action.payload };

    case "speciality":
      return { ...state, speciality: action.payload };

    case "note":
      return { ...state, note: action.payload };

    case "initState":
      return { ...initialState };

    default:
      throw Error("Invalid");
  }
}

export default function NewDoctorForm() {
  const [
    {
      firstName,
      middleName,
      lastName,
      contactNo,
      gender,
      nicNo,
      email,
      password,
      dob,
      MLNo,
      speciality,
      note,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { showAlert } = useAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateOnly = `${year}-${month}-${day}`;

    return dateOnly;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      contactNo === "" ||
      gender === null ||
      nicNo === "" ||
      email === "" ||
      password === "" ||
      dob === null ||
      speciality === "" ||
      MLNo === ""
    ) {
      showAlert("error", "Fields cannot be empty.");
      return;
    }

    if (email !== "" && !validateEmail(email)) {
      showAlert("error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    const doctorData = {
      data: {
        fname: firstName,
        mname: middleName,
        lname: lastName,
        email,
        gender,
        nic: nicNo,
        contactNo,
        dob: formatDate(dob),
        medical_license_no: MLNo,
        specialization: speciality,
        note,
      },
      credentials: {
        email,
        password,
      },
    };
    axios
      .post(`${config.baseURL}/doctor/newdoctor`, doctorData)
      .then((response) => {
        showAlert("success", "Doctor added successfully.");
        dispatch({ type: "initState" });
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
        showAlert("error", "Error adding doctor");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="New Doctor">
        <form style={{ margin: "50px 0px" }} onSubmit={onSubmit}>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="lead mb-2">Doctor's name</div>
              <div className="row">
                <div className="col-sm-5">
                  <TextField
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) =>
                      dispatch({ type: "firstName", payload: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-5">
                  <TextField
                    placeholder="Middle name (Optional)"
                    value={middleName}
                    onChange={(e) =>
                      dispatch({ type: "middleName", payload: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-10">
                  <TextField
                    placeholder="Last name"
                    fullWidth
                    value={lastName}
                    onChange={(e) =>
                      dispatch({ type: "lastName", payload: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="lead mb-2">Email Address & password</div>
              <TextField
                placeholder="Enter email address"
                className="w-75"
                value={email}
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
              />
              <OutlinedInput
                className="w-75 mt-3"
                type={showPassword ? "text" : "password"}
                placeholder="Enter a Password"
                value={password}
                onChange={(e) =>
                  dispatch({ type: "password", payload: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="lead mb-2">Gender</div>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                row
                value={gender}
                onChange={(e) =>
                  dispatch({ type: "gender", payload: e.target.value })
                }
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </div>
            <div className="col-md-6">
              <div className="lead mb-2">NIC Number</div>
              <TextField
                placeholder="Enter NIC number"
                className="w-75"
                value={nicNo}
                onChange={(e) =>
                  dispatch({ type: "nicNo", payload: e.target.value })
                }
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="lead mb-2">Contact Number</div>
              <TextField
                className="w-75"
                placeholder="Enter contact number"
                value={contactNo}
                onChange={(e) =>
                  dispatch({ type: "contactNo", payload: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <div className="lead mb-2">Date of Birth</div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="w-75"
                  value={dob}
                  onChange={(d) => dispatch({ type: "dob", payload: d })}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="lead mb-2">Medical License number</div>
              <TextField
                placeholder="Enter medical license number"
                className="w-75"
                value={MLNo}
                onChange={(e) =>
                  dispatch({ type: "MLNo", payload: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <div className="lead mb-2">Speciality</div>
              <Select
                className="w-75"
                placeholder="Select speciality"
                displayEmpty
                value={speciality}
                onChange={(e) =>
                  dispatch({ type: "speciality", payload: e.target.value })
                }
              >
                {doctorSpecializations.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="lead mb-2">Note</div>
              <TextArea
                id="note"
                value={note}
                handleChange={function (e) {
                  dispatch({ type: "note", payload: e.target.value });
                }}
              />
            </div>
            <div className="col-md-6">
              <div className="lead mb-2">Photo</div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload photo
                <VisuallyHiddenInput type="file" />
              </Button>
            </div>
          </div>
          <div className="col-10 text-end">
            <input
              type="submit"
              className="btn btn-primary"
              value="Add Doctor"
            />
          </div>
        </form>
      </Container>
    </Paper>
  );
}
