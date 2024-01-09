const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { webhookCallback } = require("grammy");
const { rateLimit } = require("express-rate-limit");

const { connectToDB } = require("./db/connect.js");

const { launchBot } = require("./bot/maingrammy.js");

const userRouter = require("./routes/user.router.js");
const wirdRouter = require("./routes/wird.router.js");

dotenv.config({ path: ".env" });

const app = express();

const { EXPRESS_PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/v1/users", userRouter);
app.use("/v1/wirds", wirdRouter);

async function startServer() {
  await connectToDB();

  const bot = await launchBot();
  app.use(webhookCallback(bot, "express"));

  app.listen(EXPRESS_PORT, () => {
    console.log(`Server listening on port ${EXPRESS_PORT}`);
  });
}

startServer();
