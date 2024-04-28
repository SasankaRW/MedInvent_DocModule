import { Button, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { useState } from "react";
import TextArea from "./TextArea/TextArea";
import axios from "axios";
import { useAlert } from "../Contexts/AlertContext";
import config from "../config";
import Loader from "./Loader/Loader";

export default function DoctorUpdateModal({ doctor, closeModal }) {
  const [contactNo, setContactNo] = useState(doctor.contactNo);
  const [note, setNote] = useState(doctor.note);
  const [isLoading, setIsLoading] = useState(false);

  const { showAlert } = useAlert();

  function onUpdate() {
    if (note === doctor.note && contactNo === doctor.contactNo) {
      closeModal();
      return;
    }

    setIsLoading(true);
    const newData = {
      contactNo,
      note,
    };

    axios
      .put(`${config.baseURL}/doctor/update/${doctor.doctor_id}`, newData)
      .then((res) => {
        showAlert("success", "Doctor updated successfully.");
        closeModal();
      })
      .catch((e) => {
        console.log(e);
        showAlert("error", "Failed to update doctor.");
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
    <div style={{ width: "25vw" }}>
      <div>
        <div className="mb-2">Contact Number</div>
        <TextField
          placeholder="New contact number"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value.replace(/[^0-9]/g, ""))}
        />
      </div>
      <div className="mt-3">
        <div className="mb-2">Note</div>
        <textarea
          className="rounded w-100"
          style={{ padding: "10px" }}
          placeholder="Enter a note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
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
