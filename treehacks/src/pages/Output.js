// OutputPage.js
import React from "react";
import ResultsComponent from "../components/PHresults/PHresults";
import "./Output.css"; // Assuming your CSS is in Output.css
import MapComponent from "../components/Map/Map";

function Output() {
  return (
    <div>
      <h2>Output Page</h2>
      <ResultsComponent />
      <MapComponent />
      <div className="grid-container">
        <div className="grid-item">
          <img
            src={`${process.env.PUBLIC_URL}/US_Prec.png`}
            alt="US Precipitation"
          />
        </div>
        <div className="grid-item">
          <img
            src={`${process.env.PUBLIC_URL}/CropPrec.png`}
            alt="Crop Precipitation"
          />
        </div>
        <div className="grid-item">
          <img
            src={`${process.env.PUBLIC_URL}/TotalPrec.png`}
            alt="Total Precipitation"
          />
        </div>
        <div className="grid-item">
          <img
            src={`${process.env.PUBLIC_URL}/NASS_cropdata.png`}
            alt="Nass Crop Data"
          />
        </div>
      </div>
    </div>
  );
}

export default Output;
