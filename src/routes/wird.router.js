const express = require("express");
const wirdRouter = express.Router();

const {
  createWird,
  deleteWird,
  getWirds,
  getWirdById,
} = require("../controllers/wirds");
const { checkTelegramIdHeader } = require("../services/checkTelegramIdHeader");

wirdRouter.use(checkTelegramIdHeader);

wirdRouter.post("/", createWird);
wirdRouter.delete("/", deleteWird);
wirdRouter.get("/", getWirds);
wirdRouter.get("/:wirdId", getWirdById);

module.exports = wirdRouter;
