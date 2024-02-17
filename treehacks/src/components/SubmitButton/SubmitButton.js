import React from "react";
import "../SubmitButton/SubmitButton.css"; // Importing CSS for styling

const SubmitButton = ({ label, onClick }) => {
  return (
    <button className="submitButton" onClick={onClick}>
      {label}
    </button>
  );
};

export default SubmitButton;
