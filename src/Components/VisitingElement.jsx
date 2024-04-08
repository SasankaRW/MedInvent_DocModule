import { IconButton, OutlinedInput } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MyModal from "./MyModal";
import Button from "./Button/Button";

export function VisitingElement({ item, type }) {
  const handleClose = () => {};
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 rounded-4 mb-2"
      style={{
        backgroundColor: "#edf8ff",
      }}
    >
      <div>
        <div style={{ fontSize: "18px" }}>{item.name}</div>
        <div className="mt-1 d-flex align-items-center">
          Doctor fee : Rs.{" "}
          <span>
            <b>{item.doctorFee}</b>
          </span>
          {type === "doctor" && (
            <MyModal
              icon={
                <BorderColorIcon
                  fontSize="small"
                  className="mx-3"
                  style={{ color: "gray" }}
                />
              }
            >
              <UpdateDocFee closeModal={handleClose} />
            </MyModal>
          )}
        </div>
      </div>
      <div>
        <IconButton>
          <DeleteOutlineIcon fontSize="medium" style={{ color: "gray" }} />
        </IconButton>
      </div>
    </div>
  );
}

function UpdateDocFee({ closeModal }) {
  function onUpdate() {
    alert("fee updated");
    closeModal();
  }
  return (
    <div className="text-center">
      <div className="lead">
        Change doctor fee for medicare clinic appointments
      </div>
      <div>
        <OutlinedInput
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
