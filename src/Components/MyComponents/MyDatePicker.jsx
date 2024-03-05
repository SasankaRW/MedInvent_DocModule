import { useState } from "react";

const MyDatePicker = ({ selectedDate, setSelectedDate, label }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <div className="m-1" style={{ fontSize: "14px" }}>
        {label}{" "}
      </div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => handleDateChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        min={today}
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
