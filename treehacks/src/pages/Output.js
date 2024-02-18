// OutputPage.js
import React from "react";
import ResultComponent from "../components/PHresults/PHresults";
import "./Output.css"; // Assuming your CSS is in Output.css
import MapComponent from "../components/Map/Map";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Output(props) {
  const location = useLocation();
  const [resultMessage, setResultMessage] = useState("");

  // useEffect(() => {
  //   // If a message is already provided via navigation state, use it directly
  //   if (location.state?.message) {
  //     setResultMessage(location.state.message);
  //   } else {
  //     // Otherwise, fetch the message
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch("/submit");
  //         if (!response.ok) throw new Error("Network response was not ok");
  //         const data = await response.json();
  //         setResultMessage(data.message);
  //       } catch (error) {
  //         console.error("Error fetching results:", error);
  //         setResultMessage("Failed to load results.");
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [location.state]); // Dependency on location.state ensures useEffect reruns if state changes

  useEffect(() => {
    // Check if the message is passed in the location state
    if (location.state?.message) {
      setResultMessage(location.state.message);
    } else {
      // Fallback or default message if not passed
      setResultMessage("No results found.");
    }
  }, [location]);
  return (
    <div className="parentcontainer">
      <h2>Crop Analysis Results</h2>
      <center className="container">
        <h3 className="result">{resultMessage}</h3>

        <MapComponent className="map" />
        {/* Display the result message as an h3 */}
        <h3>Map Clipped From Shape File</h3>
      </center>
      <center className="grid-container">
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
      </center>
    </div>
  );
}

export default Output;
