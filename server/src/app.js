// API server setup
const express = require("express");

const app = express();

// Using express middleware to parse incoming JSON from incoming requests body
app.use(express.json());

module.exports = app;
