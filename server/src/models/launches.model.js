const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();

// Add state to our server
let latestFlightNumber = 100;

/// Development Hard-coded launch-data
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchData: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// we use flightNumber as a key as it's Unique
// launches.set(launch.flightNumber, launch);

// to make the model responsible of outputing clean and ready data
async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
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

saveLaunch(launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

//--------------- inserting new launch----------------- //
// using mongoDB
async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
