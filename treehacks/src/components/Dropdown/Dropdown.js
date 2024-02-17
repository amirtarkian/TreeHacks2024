import React from "react";
import "../Dropdown/Dropdown.css";

const Dropdown = ({ options, selected, onChange }) => {
  return (
    <select className="dropdown" value={selected} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
