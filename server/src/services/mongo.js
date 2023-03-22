const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://NASA-api:5qqNTULf2JWv90bF@cluster0.qd4tnzm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready ...");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  // Connecting to MongoDB
  await mongoose.connect(MONGO_URL);
}
async function mongoDisconnect() {
  // Disconnecting MongoDB
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
