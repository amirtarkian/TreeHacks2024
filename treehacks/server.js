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

app.post("/submit", (req, res) => {
  const { soilPH } = req.body;
  console.log("Received soil PH:", soilPH); // Log the received soilPH
  var soilphjson = JSON.stringify(soilPH);
  console.log("Soil PH JSON:", soilphjson);
  fs.writeFile("soildata.json", soilphjson, "utf8", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Soil PH JSON has been saved to soildata.json");
    }
  });

  fs.readFile("soildata.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log("Contents of soildata.json:", data);
    // To use the JSON data as an object, you can parse it:
    const jsonData = JSON.parse(data);
    console.log("Soil PH JSON object:", jsonData);
  });

  res.json({ message: "Soil PH data received successfully in backend" });
});

//receiving from r script
const filePath = path.join(__dirname, "resultsR/rec.json");

try {
  const data = fs.readFileSync(filePath, "utf8");
  const jsonData = JSON.parse(data);
  console.log("Crop Analysis :", jsonData);

  // Check if jsonData has a specific value or property you're interested in
  // This example assumes jsonData should have a property 'soilPH' with a meaningful value
  if (jsonData && jsonData.soilPH !== undefined) {
    console.log("Given these conditions, we recommend planting this crop");
  } else {
    // If jsonData is missing or doesn't contain the expected property/value
    console.log("Not suitable for crops");
  }
} catch (err) {
  console.error("Error reading the file:", err);
}

app.get("/get-results", (req, res) => {
  const filePath = path.join(__dirname, "resultsR/rec.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading results file" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Error parsing results data" });
    }
  });
});
