import React, { useReducer, useState } from "react";
import Container from "../../../../Components/Container/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import cities from "../cities.json";
import { Alert, Button, MenuItem, Select, Snackbar } from "@mui/material";
import Day from "../../../../Components/Day/Day";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import { useAlert } from "../../../../Contexts/AlertContext";

// Initial state for the form
const initialState = {
  clinicName: "",
  contactNumber: "",
  openHoursFrom: null,
  openHoursTo: null,
  openDays: [],
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: Object.keys(cities).at(0),
  email: "",
  password: "",
  locationURL: "",
  position: null,
  isURLcorrect: false,
};

// Reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case "clinicName":
      return { ...state, clinicName: action.payload };

    case "contactNumber":
      return { ...state, contactNumber: action.payload };

    case "openHoursFrom":
      return { ...state, openHoursFrom: action.payload };

    case "openHoursTo":
      return { ...state, openHoursTo: action.payload };

    case "openDays":
      return { ...state, openDays: action.payload };

    case "addressLine1":
      return { ...state, addressLine1: action.payload };

    case "addressLine2":
      return { ...state, addressLine2: action.payload };

    case "city":
      return { ...state, city: action.payload };

    case "district":
      return { ...state, district: action.payload };

    case "email":
      return { ...state, email: action.payload };

    case "password":
      return { ...state, password: action.payload };

    case "locationURL":
      return {
        ...state,
        locationURL: action.payload,
        isURLcorrect: false,
      };

    case "latLong":
      return { ...state, position: action.payload };

    case "isURLcorrect":
      return { ...state, isURLcorrect: !state.isURLcorrect };

    case "invalidURL":
      return { ...state, isURLcorrect: false, position: null };

    case "initState":
      return { ...initialState };

    default:
      throw Error("invalid");
  }
}

export default function NewClinicForm() {
  // State management using useReducer hook
  const [
    {
      clinicName,
      contactNumber,
      openHoursFrom,
      openHoursTo,
      openDays,
      addressLine1,
      addressLine2,
      city,
      district,
      email,
      password,
      locationURL,
      position,
      isURLcorrect,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  // Function to extract latitude and longitude from Google Maps URL
  function extractLatLongFromGoogleMapsURL(url) {
    var regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;

    var match = url.match(regex);

    if (match && match.length >= 3) {
      var latitude = parseFloat(match[1]);
      var longitude = parseFloat(match[2]);
      dispatch({ type: "isURLcorrect" });
      return { lat: latitude, long: longitude };
    } else {
      dispatch({ type: "invalidURL" });
      showAlert("error", "Please enter a valid URL");
      return null;
    }
  }

  // Function to handle URL verification
  function handleURLVerification() {
    dispatch({
      type: "latLong",
      payload: extractLatLongFromGoogleMapsURL(locationURL),
    });
  }

  function getTime(dateString) {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  // Function to toggle selected days for clinic open hours
  function toggleDay(day) {
    dispatch({
      type: "openDays",
      payload: openDays.includes(day)
        ? openDays.filter((d) => d !== day)
        : [...openDays, day],
    });
  }

  // Function to handle form submission
  function onSubmit(e) {
    e.preventDefault();
    if (
      clinicName === "" ||
      contactNumber === "" ||
      openHoursFrom === null ||
      openHoursTo === null ||
      openDays.length === 0 ||
      addressLine1 === "" ||
      city === "" ||
      password === ""
    ) {
      showAlert("error", "Fields cannot be empty.");
      return;
    }

    if (email !== "" && !validateEmail(email)) {
      showAlert("error", "Please enter a valid email address");
      return;
    }

    if (position === null) {
      showAlert("error", "Please verify the location.");
      return;
    }

    setIsLoading(true);
    const clinicData = {
      name: clinicName,
      contactNo: contactNumber,
      openHoursFrom: getTime(openHoursFrom),
      openHoursTo: getTime(openHoursTo),
      openDays: openDays,
      email: email,
      address: {
        lineOne: addressLine1,
        lineTwo: addressLine2,
        city: city,
        district: district,
      },
      location: {
        lat: position.lat,
        long: position.long,
      },
    };

    axios
      .post("http://localhost:8080/insert", clinicData)
      .then((response) => {
        showAlert("success", "Pharmacy added successfully.");
        dispatch({ type: "initState" });
      })
      .catch((error) => {
        console.error("Error adding pharmacy:", error);
        showAlert("error", "Error adding pharmacy.");
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
      <Container title="New clinic">
        <form style={{ margin: "50px 0px" }} onSubmit={onSubmit}>
          {/* Clinic Name and Contact Number fields */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="lead mb-2">Clinic Name</div>
              <TextField
                placeholder="Enter Clinic name"
                className="w-75"
                value={clinicName}
                onChange={(e) =>
                  dispatch({ type: "clinicName", payload: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <div className="lead mb-2">Contact Number</div>
              <TextField
                placeholder="Enter contact number"
                className="w-75"
                value={contactNumber}
                onChange={(e) => {
                  const contactNo = e.target.value.replace(/[^0-9]/g, "");
                  dispatch({
                    type: "contactNumber",
                    payload: contactNo,
                  });
                }}
              />
            </div>
          </div>
          {/* Open Hours and Open days fields */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="lead mb-2">Open Hours</div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="justify-content-between d-flex col-8">
                  <TimePicker
                    label="From"
                    value={openHoursFrom}
                    onChange={(time) =>
                      dispatch({
                        type: "openHoursFrom",
                        payload: time,
                      })
                    }
                    className="col-5"
                  />

                  <TimePicker
                    label="To"
                    value={openHoursTo}
                    onChange={(time) =>
                      dispatch({ type: "openHoursTo", payload: time })
                    }
                    className="col-5"
                  />
                </div>
              </LocalizationProvider>
            </div>
            <div className="col-md-6">
              <div className="lead mb-2">Open days</div>
              <div className="d-flex flex-wrap">
                {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <Day
                      key={day}
                      day={day}
                      isSelected={openDays.includes(day)}
                      toggleDay={toggleDay}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          {/* Address and Email fields */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="lead mb-2">Address</div>
              <div className="row">
                <div className="col-sm-5">
                  <TextField
                    placeholder="Line 1"
                    value={addressLine1}
                    onChange={(e) =>
                      dispatch({
                        type: "addressLine1",
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-5">
                  <TextField
                    placeholder="Line 2"
                    value={addressLine2}
                    onChange={(e) =>
                      dispatch({
                        type: "addressLine2",
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {/* Dropdown for selecting district */}
              <div className="row mt-3">
                <div className="col-sm-5">
                  <Select
                    value={district}
                    fullWidth
                    onChange={(e) =>
                      dispatch({ type: "district", payload: e.target.value })
                    }
                  >
                    {Object.keys(cities).map((k) => (
                      <MenuItem value={k}>{k}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="col-md-5">
                  <Select
                    value={city}
                    fullWidth
                    onChange={(e) =>
                      dispatch({ type: "city", payload: e.target.value })
                    }
                  >
                    {cities[district].cities.map((k) => (
                      <MenuItem value={k}>{k}</MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="lead mb-2">Email Address</div>
              <TextField
                className="w-75"
                placeholder="Enter email address"
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
          {/* Location field with URL verification */}
          <div>
            <div className="lead mb-3">Location</div>
            <div className="d-flex align-items-center">
              <Button variant="contained" onClick={() => {}}>
                Select on map
              </Button>{" "}
              <span className="mx-5">or</span>
              <TextField
                value={locationURL}
                onChange={(e) => {
                  dispatch({ type: "locationURL", payload: e.target.value });
                }}
                placeholder="Enter the google map URL"
                className="col-6"
              />
              {!isURLcorrect ? (
                <Button
                  className="mx-4"
                  variant="outlined"
                  onClick={handleURLVerification}
                >
                  verify
                </Button>
              ) : (
                <span
                  className="mx-4"
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  Verfied
                </span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end col-11 my-5">
            <input
              type="submit"
              className="btn btn-primary"
              value="Add Clinic"
            />
          </div>
        </form>
      </Container>
    </Paper>
  );
}
