const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const DB_FILE = path.join(__dirname, "db.json");

app.get("/workouts", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  res.json(data);
});

app.post("/workouts", (req, res) => {
  const { workout, duration } = req.body;

  if (!workout || !duration) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  data.push({ workout, duration });

  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Workout added" });
});

app.listen(PORT, () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, "[]");
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
