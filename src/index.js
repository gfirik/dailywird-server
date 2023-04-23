const express = require("express");
const { connectToDB } = require("./db/connect.js");
const { launchBot } = require("./bot/start.js");

const app = express();
async function startServer() {
  try {
    await connectToDB();
    await launchBot();
  } catch (err) {
    console.error(err);
  }
}
startServer();
