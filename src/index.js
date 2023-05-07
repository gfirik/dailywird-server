const express = require("express");
const app = express();
const { connectToDB } = require("./db/connect.js");
const { launchBot } = require("./bot/start.js");
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

app.use(express.json());
app.use("/users", userRouter);
app.use("/wirds", wirdRouter);

const PORT = process.env.PORT || 4444;
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
