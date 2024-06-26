import { IconButton } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";
import config from "../config";
import { useAlert } from "../Contexts/AlertContext";
import Loader from "./Loader/Loader";

export default function CancelSessionModal({
  session,
  closeModal,
  type,
  updateSessionState,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { showAlert } = useAlert();

  function onYesClick() {
    const newData = {
      isCancelled: true,
      cancelledByType: type,
      cancelledById: type === "clinic" ? user.clinic_id : user.doctor_id,
    };

    setIsLoading(true);
    axios
      .put(`${config.baseURL}/session/update/${session.session_id}`, newData)
      .then((res) => {
        showAlert("success", "Session cancelled successfully.");
        updateSessionState({ ...session, ...newData });
        closeModal();
      })
      .catch((err) => {
        showAlert("error", "Error cancelling the session.");
        console.log("Error updating the session. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onNoClick() {
    closeModal();
  }

  if (isLoading) {
    return (
      <div className="mx-3">
        <Loader />;
      </div>
    );
  }

  return (
    <div>
      <div>Are you sure want to cancel this session</div>
      <div className="text-end mt-3">
        <IconButton size="large" color="error" onClick={onNoClick}>
          <CancelRoundedIcon />
        </IconButton>
        <IconButton size="large" color="success" onClick={onYesClick}>
          <CheckCircleRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
}
