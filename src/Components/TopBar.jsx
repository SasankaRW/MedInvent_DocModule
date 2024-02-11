import React from "react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="logo"></div>
        <div className="user-info">
          <span>Hi Admin</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
