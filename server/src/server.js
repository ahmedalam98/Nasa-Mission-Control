// API server setup
const http = require("http");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  // Waiting for data promise to resolve before listening to requests in server
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
  });
}

startServer();
