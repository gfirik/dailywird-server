const User = require("../models/user.model.js");
const Wird = require("../models/wird.model.js");

async function getUser(req, res) {
  try {
    const { telegramid } = req.headers;
    if (!telegramid) {
      return res.status(400).json({ message: "Missing telegramid header" });
    }

    const user = await User.findOne({ telegramId: telegramid });
    if (!user) {
      return res.status(404).json({ message: "Telegram user not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const { telegramid } = req.headers;
    if (!telegramid) {
      return res.status(400).json({ message: "Missing telegramid header" });
    }

    const wirds = await Wird.deleteMany({ "owner.telegramId": telegramid });
    if (!wirds) {
      return res
        .status(404)
        .json({
          message: "Wirds by the user with this telegram id are not found.",
        });
    }

    const user = await User.findOneAndDelete({ telegramId: telegramid });
    if (!user) {
      return res.status(404).json({ message: "Telegram user not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getUser, deleteUser };
