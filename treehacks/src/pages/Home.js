import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppTitle from "../components/AppTitle/AppTitle";
import Dropdown from "../components/Dropdown/Dropdown";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import MapComponent from "../components/Map/Map";
import StatsInput from "../components/StatsInput/StatsInput";
import SubmitButton from "../components/SubmitButton/SubmitButton";

import "../pages/Home.css";
export default function Home() {
  // State for storing input values
  const navigate = useNavigate();
  const [soilType, setSoilType] = useState("");
  const [soilPH, setSoilPH] = useState("");
  const [nutrientContent, setNutrientContent] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [file, setFile] = useState("");
  const [showMap, setShowMap] = useState(false);
  //testing
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Access the file
    if (file) {
      setFile(file);
      console.log("File name: ", file.name); // Print out the file name
    }
  };
  const handleSubmit = () => {
    const dataToSend = { soilPH: soilPH };

    if (file) {
      console.log("File name: ", file.name);
      setShowMap(true);
    } else {
      console.log("No file selected.");
    }
    console.log("Submitting Soil pH:", soilPH);

    // //testing backend
    // fetch("/api/test")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Data from API:", data);
    //   });

    //testing ph send
    fetch("http://localhost:5003/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Handle success here (e.g., show a success message or update state)
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here (e.g., show an error message)
      });
    navigate("/output");
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
          <ImageUpload onFileSelect={(selectedFile) => setFile(selectedFile)} />
          {showMap}
          <SubmitButton label="Submit" onClick={handleSubmit} />
        </div>
        <div></div>
      </div>
    </div>
  );
}
