import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Loader2 from "../Components/Loader2/Loader2";
import axios from "axios";
import config from "../config";
import { useAlert } from "../Contexts/AlertContext";

export function Requested({ item, type, setRequestedClinics }) {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  function onAcceptClick() {
    setIsLoading(true);
    axios
      .put(
        `${config.baseURL}/visiting/update?doctorId=${item.doctor_id}&clinicId=${item.clinic_id}`,
        { isReqAccepted: true }
      )
      .then((res) => {
        setRequestedClinics((prev) =>
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

  function onDeclineClick() {
    setIsLoading(true);
    axios
      .delete(
        `${config.baseURL}/visiting/delete?doctorId=${item.doctor_id}&clinicId=${item.clinic_id}`
      )
      .then((res) => {
        setRequestedClinics((prev) =>
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
          <>
            <span>
              <IconButton onClick={onDeclineClick}>
                <CancelOutlinedIcon
                  fontSize="medium"
                  style={{ color: "red" }}
                />
              </IconButton>
            </span>
            <span>
              <IconButton onClick={onAcceptClick}>
                <CheckCircleOutlinedIcon
                  fontSize="medium"
                  style={{ color: "green" }}
                />
              </IconButton>
            </span>
            <span>
              <IconButton>
                <VisibilityOutlinedIcon
                  fontSize="medium"
                  style={{ color: "black" }}
                />
              </IconButton>
            </span>
          </>
        )}
      </div>
    </div>
  );
}
