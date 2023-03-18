// API server setup
const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");

const planetsRouter = require("./routes/planets/planets.router");

///////////////////
/* MiddleWares */
///////////////////

// Allow CORS to accept requests from port 3000 ( front-end )
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Using express middleware to parse incoming JSON from incoming requests body
app.use(express.json());

// ---------------FOR PRODUCTION--------------- //
app.use(express.static(path.join(__dirname, "..", "public"))); // Middleware
// we use "*" --> so that it matches all routes from the code in the client-side
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(planetsRouter);

module.exports = app;
