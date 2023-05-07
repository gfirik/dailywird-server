const express = require("express");
const wirdRouter = express.Router();

const { createWird } = require("../controllers/wird.controller.js");

wirdRouter.post("/", createWird);

module.exports = wirdRouter;
