import React from "react";
import "../pages/Home.css";
import { useState } from "react";
import StatsInput from "../components/StatsInput/StatsInput";
import Dropdown from "../components/Dropdown/Dropdown";
import SubmitButton from "../components/SubmitButton/SubmitButton";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSelectedOption(e.target.value);
  };

  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];
  const handleSubmitClick = () => {
    console.log("Submit button clicked");
  };

  return (
    <div>
      <div className="statsinput">
        <StatsInput
          type="text"
          placeholder="Soil Type"
          value={inputValue}
          onChange={handleChange}
        />

        <StatsInput
          type="text"
          placeholder="Soil pH"
          value={inputValue}
          onChange={handleChange}
        />
        <StatsInput
          type="text"
          placeholder="Nutrient Content "
          value={inputValue}
          onChange={handleChange}
        />

        <StatsInput
          type="text"
          placeholder="Soil Moisture"
          value={inputValue}
          onChange={handleChange}
        />
        <StatsInput
          type="text"
          placeholder="Temperature"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <div className="dropdown">
        <h2>Select an Option</h2>
        <Dropdown
          options={options}
          selected={selectedOption}
          onChange={handleChange}
        />
      </div>
      <div>
        <SubmitButton label="Submit" onClick={handleSubmitClick} />
      </div>
    </div>
  );
}
