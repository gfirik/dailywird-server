const express = require("express");
const cors = require("cors");
const app = express();

const { connectToDB } = require("./db/connect.js");
const { launchBot } = require("./bot/main.js");

const userRouter = require("./routes/user.router.js");
const wirdRouter = require("./routes/wird.router.js");

async function startServer() {
  try {
    await connectToDB();
    await launchBot();
  } catch (err) {
    console.error(err);
  }
}

startServer();

app.use(cors());
app.use(express.json());
app.use("/v1/users", userRouter);
app.use("/v1/wirds", wirdRouter);

const PORT = process.env.PORT || 4444;
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
