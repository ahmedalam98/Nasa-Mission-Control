// API server setup
const express = require("express");
const app = express();

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

app.use(planetsRouter);

module.exports = app;
