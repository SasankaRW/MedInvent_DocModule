import { OutlinedInput } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MyModal from "./MyModal";
import Button from "./Button/Button";
import { useState } from "react";
import Loader2 from "./Loader2/Loader2";
import axios from "axios";
import config from "../config";
import { useAlert } from "../Contexts/AlertContext";
import { useAuth } from "../Contexts/AuthContext";

export default function UpdateClinicFeeModal({ setClinicFee, id }) {
  const handleClose = () => {};
  return (
    <MyModal
      icon={
        <BorderColorIcon
          fontSize="small"
          className="mx-3"
          style={{ color: "gray" }}
        />
      }
    >
      <UpdateClinicFee
        closeModal={handleClose}
        setClinicFee={setClinicFee}
        id={id}
      />
    </MyModal>
  );
}

function UpdateClinicFee({ closeModal, id }) {
  const [fee, setFee] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const { setClinicFees } = useAuth();

  function onUpdate() {
    setIsLoading(true);
    axios
      .put(`${config.baseURL}/clinic/update/${id}`, {
        clinicFees: parseFloat(fee),
      })
      .then((res) => {
        setClinicFees(parseFloat(fee));
        showAlert("success", "Clinic fees updated successfully");
      })
      .catch((err) => {
        showAlert("error", "Error updating clinic fees");
        console.log("Error updating clinic fees" + " Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    closeModal();
  }

  if (isLoading) {
    return <Loader2 />;
  }

  return (
    <div className="text-center">
      <div className="lead">Change clinic fee for appointments</div>
      <div>
        <OutlinedInput
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          variant="outlined"
          placeholder="Enter new fee"
          size="small"
          style={{ borderRadius: "20px", width: "200px" }}
          className="my-4"
        />
        <span className="mx-2">
          <Button text="✔" onClick={onUpdate} />{" "}
        </span>
      </div>
    </div>
  );
}
