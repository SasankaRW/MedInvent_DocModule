import React, { useReducer } from "react";
import Container from "../../../../Components/Container/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import cities from "../cities.json";
import { Button, MenuItem, Select } from "@mui/material";
import Day from "../../../../Components/Day/Day";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const initialState = {
  pharmacyName: "",
  contactNumber: "",
  openHoursFrom: null,
  openHoursTo: null,
  openDays: [],
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: Object.keys(cities).at(0),
  email: "",
  locationURL: "",
  position: null,
  isURLcorrect: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "pharmacyName":
      return { ...state, pharmacyName: action.payload };

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

    default:
      throw Error("invalid");
  }
}

export default function NewPharmacyForm() {
  const [
    {
      pharmacyName,
      contactNumber,
      openHoursFrom,
      openHoursTo,
      openDays,
      addressLine1,
      addressLine2,
      city,
      district,
      email,
      locationURL,
      position,
      isURLcorrect,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function extractLatLongFromGoogleMapsURL(url) {
    var regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;

    var match = url.match(regex);

    if (match && match.length >= 3) {
      var latitude = parseFloat(match[1]);
      var longitude = parseFloat(match[2]);
      dispatch({ type: "isURLcorrect" });
      return { lat: latitude, long: longitude };
    } else {
      alert("Invalid URL");
      return null;
    }
  }

  function handleURLVerification() {
    dispatch({
      type: "latLong",
      payload: extractLatLongFromGoogleMapsURL(locationURL),
    });
  }

  function toggleDay(day) {
    dispatch({
      type: "openDays",
      payload: openDays.includes(day)
        ? openDays.filter((d) => d !== day)
        : [...openDays, day],
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    alert("pharmacy added");
  }

  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="New Pharmacy">
        <form style={{ margin: "50px 0px" }} onSubmit={onSubmit}>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="lead mb-2">Pharmacy Name</div>
              <TextField
                placeholder="Enter pharmacy name"
                className="w-75"
                value={pharmacyName}
                onChange={(e) =>
                  dispatch({ type: "pharmacyName", payload: e.target.value })
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
            </div>
          </div>
          <div>
            <div className="lead mb-3">Location</div>
            <div className="d-flex align-items-center">
              <Button variant="contained">Select on map</Button>{" "}
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
              value="Add Pharmacy"
            />
          </div>
        </form>
      </Container>
    </Paper>
  );
}
