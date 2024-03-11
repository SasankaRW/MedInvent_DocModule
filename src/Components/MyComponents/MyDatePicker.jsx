import { useState } from "react";

const MyDatePicker = ({
  selectedDate,
  handleDateChange,
  label,
  minDate,
  maxDate,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div>
      <div className="m-1" style={{ fontSize: "14px" }}>
        {label}{" "}
      </div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => handleDateChange(e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        min={minDate}
        max={maxDate}
        style={{
          outline: isFocused ? "2px solid #1565c0" : "1px solid #ccc",
          border: "none",
          padding: "8px 15px",
          borderRadius: "20px",
          marginRight: "15px",
        }}
      />
    </div>
  );
};

export default MyDatePicker;
