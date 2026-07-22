const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

module.exports = app;