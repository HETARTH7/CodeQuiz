const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { rmSync } = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/quotesDB");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = new mongoose.model("User", userSchema);

app.post("/register", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => res.json("Added"))
    .catch((err) => res.status(400).json(err));
});

app.listen(5000, () => console.log("Server running on port 5000"));
