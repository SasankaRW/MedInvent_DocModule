import styles from "./Medicine.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Medicine({ drug, onDelete, onUpdate }) {
  const [qty, setQty] = useState(drug.qty);
  const [frq, setFrq] = useState(drug.frq);
  const [mealTiming, setMealTiming] = useState(drug.mealTiming);
  const [duration, setDuration] = useState(drug.duration);

  useEffect(() => {
    onUpdate({ ...drug, qty, frq, mealTiming, duration });
  }, [qty, frq, mealTiming, duration]);

  return (
    <div className={`row ${styles.med} d-flex align-items-center`}>
      <div className="col-2">{drug.name}</div>
      <div className="col-2">
        <TextField
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          type="number"
          InputProps={{
            style: {
              borderRadius: "10px",
              padding: 0,
              height: "30px",
              width: "75px",
              backgroundColor: "white",
            },
          }}
        />
      </div>
      <div className="col-3">
        <Select
          value={frq}
          onChange={(e) => setFrq(e.target.value)}
          displayEmpty
          sx={{
            fontSize: "13px",
            borderRadius: "10px",
            padding: 0,
            height: "30px",
            width: "150px",
            backgroundColor: "white",
          }}
        >
          {medicationFrequencies.map((x) => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="col-2">
        <Select
          value={mealTiming}
          onChange={(e) => setMealTiming(e.target.value)}
          displayEmpty
          sx={{
            fontSize: "14px",
            borderRadius: "10px",
            padding: 0,
            height: "30px",
            width: "100px",
            backgroundColor: "white",
          }}
        >
          {["After", "Before", "With"].map((x) => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="col-2">
        <TextField
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          InputProps={{
            style: {
              borderRadius: "10px",
              padding: 0,
              height: "30px",
              width: "75px",
              backgroundColor: "white",
            },
          }}
        />
      </div>
      <div className="col-1">
        <IconButton sx={{ padding: "0", color: "grey" }} onClick={onDelete}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}

const medicationFrequencies = [
  "Once Daily",
  "Twice Daily",
  "3 Times Daily",
  "4 Times Daily",
  "Every 4 Hours",
  "Every 6 Hours",
  "Every 8 Hours",
  "Every 12 Hours",
  "Once Weekly",
  "Twice Weekly",
  "Every Other Day",
  "At Bedtime",
  "As Needed",
];
