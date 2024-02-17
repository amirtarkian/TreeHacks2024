import React from "react";
import "../StatsInput/StatsInput.css";

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className="inputField"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
