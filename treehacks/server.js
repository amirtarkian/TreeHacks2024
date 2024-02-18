const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const R = require("r-script");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//R testing
app.get("/api", (req, res) => {
  R("R/WelcomeStatement.R").call(function (err, result) {
    if (err) {
      console.error("R script error:", err);
      res.status(500).json({ error: "Error executing R script" });
    } else {
      console.log("R script result:", result);
      res.json(result);
    }
  });
});

//receiving crop from frontend
app.use(express.json());

app.post("/api/sendCrop", (req, res) => {
  const { selectedCrop } = req.body; // Extract the selected crop from the request body
  console.log("Selected crop received:", selectedCrop); // Log or process the selected crop

  // Respond back to the frontend
  res.json({ message: `Received crop: ${selectedCrop}` });
});
