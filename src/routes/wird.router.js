const express = require("express");
const wirdRouter = express.Router();

const { createWird, deleteWird } = require("../controllers/wird.controller.js");

wirdRouter.post("/", createWird);
wirdRouter.delete("/", deleteWird);

module.exports = wirdRouter;
