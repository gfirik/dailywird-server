const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config.js");

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      connectTimeoutMS: 30000,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }

  const db = mongoose.connection;
  db.on("disconnected", () => {
    console.warn("MongoDB disconnected!");
  });

  process.on("SIGINT", () => {
    db.close(() => {
      console.log("MongoDB connection closed!");
      process.exit(0);
    });
  });
}

module.exports = {
  connectToDB,
};
