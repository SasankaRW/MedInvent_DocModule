import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { IconButton } from "@mui/material";

export function Pending({ item }) {
  return (
    <div
      style={{
        backgroundColor: "#edf8ff",
      }}
      className="d-flex align-items-center justify-content-between mb-3 px-3 py-2 rounded-4"
    >
      <div>{item.name}</div>
      <div>
        <IconButton>
          <CancelOutlinedIcon fontSize="medium" style={{ color: "red" }} />
        </IconButton>
      </div>
    </div>
  );
}
