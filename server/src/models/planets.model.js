const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const habitablePlaents = [];

function isHabitablePlaent(planet) {
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
      .on("data", (data) => {
        if (isHabitablePlaent(data)) {
          habitablePlaents.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlaents.length} habitable planets found`);
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  planets: habitablePlaents,
};
