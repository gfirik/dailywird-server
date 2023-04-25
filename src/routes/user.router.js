const express = require("express");
const userRouter = express.Router();

const { getUser, deleteUser } = require("../controllers/user.controller.js");

userRouter.get("/", getUser);
userRouter.delete("/", deleteUser);

module.exports = userRouter;
