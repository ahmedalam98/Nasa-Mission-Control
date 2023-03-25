// API server setup
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const api = require("./routes/api");

// ---------------Middlewares--------------- //

// Security related middleware
// Allow CORS to accept requests from port 3000 ( front-end )
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// HTTP request logger middleware
app.use(morgan("combined"));

// Using express middleware to parse incoming JSON from incoming requests body
app.use(express.json());
app.use("/v1", api);

// ---------------FOR PRODUCTION--------------- //

//Serve static files inside production directory
app.use(express.static(path.join(__dirname, "..", "public")));

// we use "*" --> so that it matches all routes from the code in the client-side
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
