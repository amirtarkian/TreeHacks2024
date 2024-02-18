const express = require("express");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");
const R = require("r-script");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//receiving crop from frontend
app.use(express.json());

// app.post("/submit", (req, res) => {
//   const { soilPH } = req.body;
//   console.log("Received soil PH:", soilPH); // Log the received soilPH

//   var soilphjson = JSON.stringify(soilPH);
//   console.log("Soil PH JSON:", soilphjson);
//   fs.writeFile("soildata.json", soilphjson, "utf8", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Soil PH JSON has been saved to soildata.json");
//     }
//   });

//   fs.readFile("soildata.json", "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return;
//     }
//     console.log("Contents of soildata.json:", data);
//     // To use the JSON data as an object, you can parse it:
//     const jsonData = JSON.parse(data);
//     console.log("Soil PH JSON object:", jsonData);
//   });
//   if (parseFloat(soilPH) < 6.0) {
//     console.log(
//       "Soil is acidic; Given these conditions, we do not recommend planting this crop"
//     );
//     returnJSON = {
//       should_plant: false,
//       message:
//         "Soil is acidic; Given these conditions, we do not recommend planting this crop",
//     };
//   } else if (parseFloat(soilPH) > 6.8) {
//     console.log(
//       "Soil is alkaline; Given these conditions, we do not recommend planting this crop"
//     );
//     returnJSON = {
//       should_plant: false,
//       message:
//         "Soil is alkaline; Given these conditions, we do not recommend planting this crop",
//     };
//   } else {
//     console.log(
//       "Soil is neutral; Given these conditions, we recommend planting this crop"
//     );
//     returnJSON = {
//       should_plant: true,
//       message:
//         "Soil is neutral; Given these conditions, we recommend planting this crop",
//     };
//   }

//   // Send the returnJSON object back to the frontend
//   res.json(returnJSON);

//   // res.json({ message: "Soil PH data received successfully in backend" });
// });

// //receiving from r script
// const filePath = path.join(__dirname, "resultsR/rec.json");

// try {
//   const data = fs.readFileSync(filePath, "utf8");
//   const jsonData = JSON.parse(data);
//   console.log("Crop Analysis :", jsonData);

//   // Check if jsonData has a specific value or property you're interested in
//   // This example assumes jsonData should have a property 'soilPH' with a meaningful value
//   if (jsonData && jsonData.soilPH !== undefined) {
//     console.log("Given these conditions, we recommend planting this crop");
//   } else {
//     // If jsonData is missing or doesn't contain the expected property/value
//     console.log("Not suitable for crops");
//   }
// } catch (err) {
//   console.error("Error reading the file:", err);
// }

// app.get("/get-results", (req, res) => {
//   const filePath = path.join(__dirname, "resultsR/rec.json");

//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).json({ error: "Error reading results file" });
//     }

//     try {
//       const jsonData = JSON.parse(data);
//       res.json(jsonData);
//     } catch (parseError) {
//       console.error("Error parsing JSON:", parseError);
//       res.status(500).json({ error: "Error parsing results data" });
//     }
//   });
// });
app.post("/submit", (req, res) => {
  console.log("Received data:", req.body); // Log the received data
  const {
    crop = req.body.crop,
    soilType = req.body.soilType,
    pH = req.body.soilPH,
    nutrientContent = req.body.nutrientContent,

    soilMoisture = req.body.soilMoisture,
    temperature = req.body.temperature,
  } = req.body;

  let message = ""; // Initialize the message variable
  console.log("crop: ", crop);
  console.log("ph: ", pH);
  console.log("nutrient: ", nutrientContent);
  console.log("soilMoisture: ", soilMoisture);
  console.log("temperature: ", temperature);

  if (crop === "corn") {
    if (
      (soilType === "sand" || soilType === "loam" || soilType === "clay") &&
      pH >= 6.0 &&
      pH <= 6.8
      // nutrientContent >= 22 &&
      // soilMoisture === 1 && // Assuming 1 inch per week as a check
      // temperature >= 50 &&
      // temperature <= 85
    ) {
      message = "Conditions are suitable for planting Corn.";
    } else {
      message = "Conditions are not suitable for planting Corn.";
    }
  } else if (crop === "tomatoes") {
    if (
      (soilType === "sand" || soilType === "loam") &&
      pH >= 6.2 &&
      pH <= 6.8 &&
      nutrientContent >= 134
      // soilMoisture >= 1 &&
      // soilMoisture <= 2 && // 1-2 inches per week
      // temperature >= 60 &&
      // temperature <= 85
    ) {
      message = "Conditions are suitable for planting Tomato.";
    } else {
      message = "Conditions are not suitable for planting Tomato.";
    }
  } else if (crop === "soybean") {
    if (
      soilType === "loam" &&
      pH >= 6.0 &&
      pH <= 7.0
      // nutrientContent >= 40 &&
      // soilMoisture === 1 &&
      // temperature >= 68 &&
      // temperature <= 86
    ) {
      message = "Conditions are suitable for planting Soybean.";
    } else {
      message = "Conditions are not suitable for planting Soybean.";
    }
  } else if (crop === "oats") {
    if (
      (soilType === "sand" || soilType === "loam" || soilType === "clay") &&
      pH >= 4.5 &&
      pH <= 6.0
      // nitrogen >= 40 &&
      // nutrientContent >= 30 &&
      // soilMoisture <= 1 &&
      // temperature >= 45 &&
      // temperature <= 82
    ) {
      message = "Conditions are suitable for planting Oats.";
    } else {
      message = "Conditions are not suitable for planting Oats.";
    }
  } else {
    // Default message if the crop is not recognized
    message = "Crop not recognized or missing conditions.";
  }
  console.log("After if statements:", message);

  // Send the response back with the evaluation message
  res.json({ message: message, data: req.body });
});
