const express = require("express");
const userRouter = express.Router();

const { getUser, deleteUser } = require("../controllers/users");

userRouter.get("/", getUser);
userRouter.delete("/", deleteUser);

module.exports = userRouter;
