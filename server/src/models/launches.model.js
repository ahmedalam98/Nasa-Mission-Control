const launches = new Map();

// Add state to our server
const latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  launchDate: new Date("December 27 2030"),
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  destination: "Kepler-442 b",
  customer: ["NASA"],
  upcoming: true,
  success: true
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  // Map is not JS object notation, By extracting these values into Array we can Manipulate the map data into JSON data format
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    // Assign the latestFlightNumber as a key for new launch
    latestFlightNumber,
    Object.assign(launch, {
      customer: ["NASA", "SpaceX"],
      upcoming: true,
      success: true,
      flightNumber: latestFlightNumber
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
