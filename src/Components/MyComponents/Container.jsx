import React from "react";
import "./Container.css";

export default function Container({ title, children }) {
  return (
    <div className="cont">
      <div className="cont-title">{title}</div>
      {children}
    </div>
  );
}
