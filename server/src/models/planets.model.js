const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const planets = require("./planets.mongo");

// const habitablePlaents = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`found ${countPlanetsFound} planets that are habitable`);
        console.log("done processing files");

        resolve();
      });
  });
}

async function getAllPlanets() {
  // find all planets --> {}
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    // saving data to mongo instead of array with upsert (insert + update)
    await planets.updateOne(
      {
        // the filter
        keplerName: planet.kepler_name,
      },
      {
        // the data to insert matching the planets-schema
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`can't save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
