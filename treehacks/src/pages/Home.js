import React, { useState } from "react";
import AppTitle from "../components/AppTitle/AppTitle";
import Dropdown from "../components/Dropdown/Dropdown";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import MapComponent from "../components/Map/Map";
import StatsInput from "../components/StatsInput/StatsInput";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import "../pages/Home.css";
export default function Home() {
  // State for storing input values
  const [soilType, setSoilType] = useState("");
  const [soilPH, setSoilPH] = useState("");
  const [nutrientContent, setNutrientContent] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [geojsonData, setGeojsonData] = useState(null);
  const [showMap, setShowMap] = useState(false);
  //testing

  
  const handleUpload = () => {
    if (!geojsonData) {
      console.log("No GeoJSON data selected");
      return;
    }
    // Send geojsonData to your R script or perform other actions
    console.log("GeoJSON Data:", geojsonData);
  };

  //Rewriting the handle filechange function 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedGeoJson = JSON.parse(e.target.result);
          // Validate if the parsed data is GeoJSON
          if (parsedGeoJson && parsedGeoJson.type === "FeatureCollection") {
            setGeojsonData(parsedGeoJson);
            console.log("GeoJSON Data:", parsedGeoJson);
          } else {
            console.error("Invalid GeoJSON format");
          }
        } catch (error) {
          console.error("Error parsing GeoJSON file:", error);
        }
      };
      reader.readAsText(file);
    }
  };


  const handleSubmit = () => {
    // Step 4
    const inputs = {
      soilMoisture: 2,
      temperature: 70,
      soilPH: 6,
    };
    // if (file) {
    //   console.log("File name: ", file.name);
    //   setShowMap(true);
    // } else {
    //   console.log("No file selected.");
    // }
    console.log("button clicked");
    //testing backend
    fetch("/api/test")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
      });
  };
  // State for storing the selected option from the dropdown
  const [selectedOption, setSelectedOption] = useState("");
  // State for storying the selected option from the dropdown for the soil type
  const [selectedOptionsSoil, setSelectedOption2] = useState("");
  // Options for the dropdown
  const options = [
    { label: "Select a Crop", value: "" },
    { label: "Corn", value: "corn" },
    { label: "Tomatoes", value: "tomatoes" },
  ];
  //options for the soil drop down
  const optionsSoil = [
    { label: "Select a Soil Type", value: "" },
    { label: "Sand", value: "sand" },
    { label: "Loam", value: "loam" },
    { label: "Clay", value: "clay" },
  ];
  // Separate handleChange functions for each input and the dropdown
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };
  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleDropdownChange2 = (e) => {
    setSelectedOption2(e.target.value);
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
          <Dropdown
            options={optionsSoil}
            selected={selectedOptionsSoil}
            onChange={handleDropdownChange2}
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
          <ImageUpload onFileSelect={handleFileChange} accept="geojson" />
          {showMap && <MapComponent />}
          <SubmitButton label="Submit" onClick={handleSubmit} />
        </div>
        <div></div>
      </div>
    </div>
  );
}
