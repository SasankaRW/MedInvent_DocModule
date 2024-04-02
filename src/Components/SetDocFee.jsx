import * as React from "react";
import Button from "./Button/Button";
import { InputAdornment, OutlinedInput } from "@mui/material";

export function SetDocFee({
  selectedItem,
  docFee,
  setDocFee,
  handleAddClinic,
}) {
  return (
    <div className="text-center">
      <div className="lead">Enter doctor's fee for {selectedItem}</div>
      <OutlinedInput
        value={docFee}
        onChange={(e) => setDocFee(e.target.value)}
        type="number"
        size="small"
        placeholder="Enter Doc fee"
        className="mt-3 rounded-5"
        startAdornment={<InputAdornment position="start"> Rs.</InputAdornment>}
      />

      <div className="mt-4">
        <Button text="Add Clinic" onClick={handleAddClinic} />
      </div>
    </div>
  );
}
