const { launches } = require("../../models/launches.model");

function getAllLaunches(req, res) {
  // Map is not JS object notation, By extracting these values into Array we can Manipulate the map data into JSON data format
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  getAllLaunches,
};
