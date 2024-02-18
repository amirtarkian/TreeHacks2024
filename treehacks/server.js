const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 5001;

// Serve static files from the React app

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});
