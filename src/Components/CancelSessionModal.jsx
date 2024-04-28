import { IconButton } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export default function CancelSessionModal({ session, closeModal }) {
  function onCancelClick() {
    closeModal();
  }

  function onConfirmClick() {
    alert("Session cancelled");
    closeModal();
  }

  return (
    <div>
      <div>Are you sure want to cancel this session</div>
      <div className="text-end mt-3">
        <IconButton size="large" color="error" onClick={onCancelClick}>
          <CancelRoundedIcon />
        </IconButton>
        <IconButton size="large" color="success" onClick={onConfirmClick}>
          <CheckCircleRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
}
