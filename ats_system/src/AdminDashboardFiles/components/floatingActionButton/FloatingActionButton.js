// FAB.js
import React from "react";
import "./fab.css"; // Import CSS for styling

const FloatingActionButton = ({ onClick, text }) => {
  return (
    <div className="fab" onClick={onClick} role="button" tabIndex={0} onKeyPress={onClick}>
      <span className="tooltip">{text}</span>
      +
    </div>
  );
};

export default FloatingActionButton;
