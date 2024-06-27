import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Day from "./Day/Day";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Loader from "./Loader/Loader";
import axios from "axios";
import config from "../config";
import { useAlert } from "../Contexts/AlertContext";

export default function PharmacyClinicUpdateModal({
  item,
  closeModal,
  type,
  id,
}) {
  const [contactNo, setContactNo] = useState(item.contactNo);
  const [openHoursFrom, setOpenHoursFrom] = useState(null);
  const [openHoursTo, setOpenHoursTo] = useState(null);
  const [openDays, setOpenDays] = useState(item.openDays);
  const [isLoading, setIsLoading] = useState(false);

  const { showAlert } = useAlert();

  function toggleDay(day) {
    setOpenDays((openDays) =>
      openDays.includes(day)
        ? openDays.filter((d) => d !== day)
        : [...openDays, day]
    );
  }

  function getTime(dateString) {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  function compareTime(time1, time2) {
    const date1 = new Date("Sun, Apr 28, 2024 " + time1);
    const date2 = new Date(time2);

    if (date1.getTime() === date2.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  function onUpdate() {
    if (
      JSON.stringify(openDays) === JSON.stringify(item.openDays) &&
      ((openHoursFrom === null && openHoursTo === null) ||
        (compareTime(item.openHoursFrom, openHoursFrom) &&
          compareTime(item.openHoursTo, openHoursTo))) &&
      item.contactNo === contactNo
    ) {
      closeModal();
      return;
    }

    setIsLoading(true);

    const newdata = {
      contactNo:
        contactNo === item.contactNo || contactNo === null
          ? item.contactNo
          : contactNo,
      openDays:
        JSON.stringify(openDays) === JSON.stringify(item.openDays)
          ? item.openDays
          : openDays,
      openHoursFrom:
        openHoursFrom === null || compareTime(item.openHoursFrom, openHoursFrom)
          ? item.openHoursFrom
          : getTime(openHoursFrom),
      openHoursTo:
        openHoursTo === null || compareTime(item.openHoursTo, openHoursTo)
          ? item.openHoursTo
          : getTime(openHoursTo),
    };
    console.log(newdata);
    axios
      .put(`${config.baseURL}/${type}/update/${id}`, newdata)
      .then(() => {
        showAlert("success", `${type} updated successfully.`);
        closeModal();
      })
      .catch((e) => {
        console.log(e);
        showAlert("error", `Failed to update ${type}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <div className="mx-5 my-3">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-3 mt-3">
      <div className="col-md-6">
        <div className="mb-2">Contact Number</div>
        <TextField
          size="small"
          placeholder="Enter contact number"
          className="w-75"
          value={contactNo}
          onChange={(e) => {
            const contactNo = e.target.value;
            setContactNo(contactNo);
          }}
        />
      </div>
      <div className="mt-4">
        <div className="mb-2">Open days</div>
        <div className="d-flex flex-wrap">
          {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day) => (
            <Day
              key={day}
              day={day}
              isSelected={openDays.includes(day)}
              toggleDay={toggleDay}
            />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-2">Open Hours</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="justify-content-between d-flex col-8">
            <TimePicker
              label="From"
              value={openHoursFrom}
              onChange={(time) => setOpenHoursFrom(time)}
            />

            <TimePicker
              label="To"
              value={openHoursTo}
              onChange={(time) => setOpenHoursTo(time)}
              className="mx-3"
            />
          </div>
        </LocalizationProvider>
      </div>
      <div className="text-end mt-4">
        <Button
          variant="contained"
          className="mx-2"
          sx={{ backgroundColor: "gray" }}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
}
