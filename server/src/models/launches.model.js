const launches = new Map();

// Add state to our server
let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchData: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// we use flightNumber as a key as it's Unique
launches.set(launch.flightNumber, launch);

// to make the model responsible of outputing clean and ready data
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
      success: true,
      upcoming: true,
      customer: ["ZTM", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
