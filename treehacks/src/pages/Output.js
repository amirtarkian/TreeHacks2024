// OutputPage.js
import React from "react";
import ResultComponent from "../components/PHresults/PHresults";
import "./Output.css"; // Assuming your CSS is in Output.css
import MapComponent from "../components/Map/Map";
import { useEffect, useState } from "react";

function Output() {
  const [resultMessage, setResultMessage] = useState("");
  useEffect(() => {
    // Mock fetching data - replace this with actual fetch call
    const fetchData = async () => {
      const response = await fetch("/submit");
      const data = await response.json();
      setResultMessage(data.message);

      // Mocking a fetch call response
      setResultMessage("Soil conditions are optimal for your crop selection.");
    };

    fetchData();
  }, []);

  return (
    <div className="parentcontainer">
      <h2>Output Page</h2>
      <ResultComponent className="results" />
      <MapComponent className="map" />
      <h3>Map of something</h3>
      <div className="grid-container">
        <div className="grid-item">
          <img
            src={`${process.env.PUBLIC_URL}/US_Prec.png`}
            alt="US Precipitation"
          />
          <h3>Map of US Precipitation</h3>
        </div>
        <div className="grid-item">
          <img
            src={`${process.env.PUBLIC_URL}/CropPrec.png`}
            alt="Crop Precipitation"
          />
          <h3>Map of Crop Precipitation</h3>
        </div>
        <div className="grid-item">
          <img
            src={`${process.env.PUBLIC_URL}/TotalPrec.png`}
            alt="Total Precipitation"
          />
          <h3>Map of Total Precipitation</h3>
        </div>
        <div className="grid-item">
          <img
            src={`${process.env.PUBLIC_URL}/NASS_cropdata.png`}
            alt="Nass Crop Data"
          />
          <h3>Map of NASS Crop Data</h3>
        </div>
      </div>
    </div>
  );
}

export default Output;
