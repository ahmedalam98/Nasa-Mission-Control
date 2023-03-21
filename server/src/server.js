// API server setup
const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://NASA-api:5qqNTULf2JWv90bF@cluster0.qd4tnzm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready ...");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  // Connecting to MongoDB
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Waiting for data promise to resolve before listening to requests in server
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
  });
}

startServer();
