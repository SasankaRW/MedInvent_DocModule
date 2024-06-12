import { IconButton, OutlinedInput } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MyModal from "./MyModal";
import Button from "./Button/Button";
import { useState } from "react";
import { useAlert } from "../Contexts/AlertContext";
import axios from "axios";
import config from "../config";
import Loader2 from "./Loader2/Loader2";

export function VisitingElement({ item, type, setAddedClinics }) {
  const [docFee, setDocFee] = useState(item.docFee);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  function onDelete() {
    setIsLoading(true);
    axios
      .delete(
        `${config.baseURL}/visiting/delete?doctorId=${item.doctor_id}&clinicId=${item.clinic_id}`
      )
      .then((res) => {
        setAddedClinics((prev) =>
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

  const handleClose = () => {};
  return (
    <div
      style={{
        backgroundColor: "#edf8ff",
      }}
      className="d-flex align-items-center justify-content-between mb-3 px-4 py-3 rounded-4"
    >
      <div>
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
        <div className="mt-1 d-flex align-items-center">
          Doctor fee :
          <span>
            <b>
              {type === "doctor"
                ? docFee === null
                  ? " Not set"
                  : "Rs. " + docFee
                : type === "clinic"
                ? docFee === null
                  ? " Set doc fee"
                  : "Rs. " + docFee
                : null}
            </b>
          </span>
          {type === "clinic" && (
            <MyModal
              icon={
                <BorderColorIcon
                  fontSize="small"
                  className="mx-3"
                  style={{ color: "gray" }}
                />
              }
            >
              <UpdateDocFee
                closeModal={handleClose}
                item={item}
                setDocFee={setDocFee}
              />
            </MyModal>
          )}
        </div>
      </div>
      <div>
        {isLoading ? (
          <Loader2 />
        ) : (
          <IconButton onClick={onDelete}>
            <DeleteOutlineIcon fontSize="medium" style={{ color: "gray" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export function UpdateDocFee({ closeModal, item, setDocFee }) {
  const { showAlert } = useAlert();

  const [fee, setFee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function onUpdate() {
    if (fee === null || fee === 0) {
      showAlert("error", "Please enter a valid fee");
      return;
    }

    setIsLoading(true);

    axios
      .put(
        `${config.baseURL}/visiting/update?doctorId=${item.doctor_id}&clinicId=${item.clinic_id}`,
        { docFee: parseFloat(fee) }
      )
      .then((res) => {
        setDocFee(fee);
        closeModal();
      })
      .catch((err) => {
        showAlert("error", "Error updating doctor fee");
        console.log("Error updating doctor fee. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <Loader2 />;
  }

  return (
    <div className="text-center">
      <div className="lead">Change doctor fee for {item.clinic.name}</div>
      <div>
        <OutlinedInput
          variant="outlined"
          placeholder="Enter new fee"
          size="small"
          style={{ borderRadius: "20px", width: "200px" }}
          className="my-4"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
        <span className="mx-2">
          <Button text="✔" onClick={onUpdate} />{" "}
        </span>
      </div>
    </div>
  );
}
