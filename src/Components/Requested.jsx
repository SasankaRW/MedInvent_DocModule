import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton } from "@mui/material";

export function Requested({ item, subHeading}) {
  return (
    <div
      style={{
        backgroundColor: "#edf8ff",
      }}
      className="d-flex align-items-center justify-content-between mb-3 px-4 py-3 rounded-4"
    >
      <div>
        <div>{item.name}</div>
        <small className="text-muted">{subHeading}</small>
      </div>
      <div>
        <span>
          <IconButton>
            <CancelOutlinedIcon fontSize="medium" style={{ color: "red" }} />
          </IconButton>
        </span>
        <span>
          <IconButton>
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
      </div>
    </div>
  );
}
