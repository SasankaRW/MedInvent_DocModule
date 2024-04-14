import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { IconButton } from "@mui/material";
import { useAlert } from "../Contexts/AlertContext";
import { useState } from "react";
import config from "../config";
import axios from "axios";
import Loader2 from "./Loader2/Loader2";

export function Pending({ item, type, setPendingClinics }) {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  function onDeleteClick() {
    setIsLoading(true);
    axios
      .delete(
        `${config.baseURL}/visiting/delete?doctorId=${item.doctor_id}&clinicId=${item.clinic_id}`
      )
      .then((res) => {
        setPendingClinics((prev) =>
          prev.filter((clinic) => clinic.id !== item.id)
        );
      })
      .catch((err) => {
        showAlert("error", "Error removing the request");
        console.log("Error removing the request. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div
      style={{
        backgroundColor: "#edf8ff",
      }}
      className="d-flex align-items-center justify-content-between mb-3 px-4 py-3 rounded-4"
    >
      {type === "clinic" && (
        <div>
          <div>{item.clinic.name}</div>
          <small className="text-muted">
            {item.clinic.clinicAddress.city},{" "}
            {item.clinic.clinicAddress.district}
          </small>
        </div>
      )}
      {type === "doctor" && (
        <div>
          <div>
            {item.doctor.fname} {item.doctor.lname}
          </div>
          <small className="text-muted">{item.doctor.specialization}</small>
        </div>
      )}
      <div>
        {isLoading ? (
          <Loader2 />
        ) : (
          <div>
            <IconButton onClick={onDeleteClick}>
              <CancelOutlinedIcon fontSize="medium" style={{ color: "red" }} />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}
