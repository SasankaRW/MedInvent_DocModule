import React from "react";
import "./Form.css";

export default function Form({ children, title }) {
  return (
    <div className="form">
      <div className="form-title">{title}</div>
      {children}
    </div>
  );
}
