import React, { useState } from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import MapComponent from "../components/Map/Map";
import StatsInput from "../components/StatsInput/StatsInput";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import "../pages/Home.css";
import AppTitle from "../components/AppTitle/AppTitle";
import ImageUpload from "../components/ImageUpload/ImageUpload";

export default function Home() {
  // State for storing input values
  const [soilType, setSoilType] = useState("");
  const [soilPH, setSoilPH] = useState("");
  const [nutrientContent, setNutrientContent] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperature, setTemperature] = useState("");

  // State for storing the selected option from the dropdown
  const [selectedOption, setSelectedOption] = useState("");

  // Options for the dropdown
  const options = [
    { label: "Corn", value: "corn" },
    { label: "Tomatoes", value: "tomatoes" },
  ];

  // Separate handleChange functions for each input and the dropdown
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmitClick = () => {
    console.log("Submit button clicked");
  };

  return (
    <div className="parentContainer">
      <div className="bannerContainer">
        <img
          src={`${process.env.PUBLIC_URL}/farmland.png`}
          alt="Farmland"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="titleContainer">
        {" "}
        <AppTitle />
      </div>
      <div className="leftContainer">
        <div className="dropdownContainer">
          <h2>Select a Crop</h2>
          <Dropdown
            options={options}
            selected={selectedOption}
            onChange={handleDropdownChange}
          />
        </div>
        <div className="statsinput">
          <StatsInput
            type="text"
            placeholder="Soil Type"
            value={soilType}
            onChange={(e) => handleInputChange(e, setSoilType)}
          />

          <StatsInput
            type="text"
            placeholder="Soil pH"
            value={soilPH}
            onChange={(e) => handleInputChange(e, setSoilPH)}
          />
          <StatsInput
            type="text"
            placeholder="Nutrient Content "
            value={nutrientContent}
            onChange={(e) => handleInputChange(e, setNutrientContent)}
          />

          <StatsInput
            type="text"
            placeholder="Soil Moisture"
            value={soilMoisture}
            onChange={(e) => handleInputChange(e, setSoilMoisture)}
          />
          <StatsInput
            type="text"
            placeholder="Temperature"
            value={temperature}
            onChange={(e) => handleInputChange(e, setTemperature)}
          />
        </div>
        <div className="rightContainer">
          <div>
            <MapComponent /> {/* Include the MapComponent here */}
          </div>
          <div className="imageUploadContainer">
            <ImageUpload />{" "}
          </div>
          <div>
            <SubmitButton label="Submit" onClick={handleSubmitClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
