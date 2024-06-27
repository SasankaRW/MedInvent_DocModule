import { IconButton } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export default function DeleteConfirmation({ onDelete, closeModal, text }) {
  function onNoClick() {
    closeModal();
  }

  return (
    <div>
      <div>{text}</div>
      <div className="text-end mt-3">
        <IconButton size="large" color="error" onClick={onNoClick}>
          <CancelRoundedIcon />
        </IconButton>
        <IconButton size="large" color="success" onClick={onDelete}>
          <CheckCircleRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
}
