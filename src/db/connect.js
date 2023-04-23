const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config.js");

async function connectToDB() {
  try {
    const db = await mongoose.createConnection(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db.on("error", (err) => {
      console.error("Error connecting to MongoDB:", err);
    });

    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    db.on("disconnected", () => {
      console.warn("MongoDB disconnected!");
    });

    process.on("SIGINT", () => {
      db.close(() => {
        console.log("MongoDB connection closed!");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

module.exports = {
  connectToDB,
};
