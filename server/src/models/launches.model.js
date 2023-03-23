const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

/// Development Hard-coded launch-data
// const launch = {
//   flightNumber: 100, // flight_number
//   mission: "Kepler Exploration X", // name
//   rocket: "Explorer IS1", // rocket.name
//   launchData: new Date("December 27, 2030"), // date_local
//   target: "Kepler-442 b", // not applicable
//   customers: ["ZTM", "NASA"], // payload.customers for each payload
//   upcoming: true, // upcoming
//   success: true, // success
// };

saveLaunch(launch);

//--------GETTING ALL PREVIOS LAUNCHES (REAL-LIFE DATA)--------//
// from: https://github.com/r-spacex/SpaceX-API/tree/master/docs#rspacex-api-docs
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function loadlLaunchesData() {
  console.log("downloading launch data...");
  const response = await axios.post(SPACEX_API_URL, {
    // options to get rocket's name
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
}

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

//--------------- inserting new launch----------------- //

// using mongoDB
// to make the model responsible of outputing clean and ready data
async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["NASA", "ZTM"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.acknowledged === true && aborted.matchedCount === 1;
  // const aborted = launches.get(launchId);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  loadlLaunchesData,
};
