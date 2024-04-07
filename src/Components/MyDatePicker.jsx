import { useState } from "react";

const MyDatePicker = ({
  selectedDate,
  handleDateChange,
  label,
  minDate,
  maxDate,
  isStart,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  function convertDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

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
        min={isStart ? convertDate() : minDate}
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
