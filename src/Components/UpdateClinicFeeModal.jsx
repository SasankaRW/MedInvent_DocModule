import { IconButton, OutlinedInput } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MyModal from "./MyModal";
import Button from "./Button/Button";
import { useState } from "react";
import Loader2 from "./Loader2/Loader2";

export default function UpdateClinicFeeModal({ setClinicFee }) {
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
      <UpdateClinicFee closeModal={handleClose} setClinicFee={setClinicFee} />
    </MyModal>
  );
}

function UpdateClinicFee({ closeModal, setClinicFee }) {
  const [fee, setFee] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onUpdate() {
    setClinicFee(parseFloat(fee));
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
