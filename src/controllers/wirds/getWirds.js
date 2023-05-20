const Wird = require("../../models/wird.model.js");

async function getWirds(req, res) {
  try {
    const { telegramid } = req.headers;
    if (!telegramid) {
      return res.status(400).json({ message: "Missing telegramid header" });
    }

    const wirds = await Wird.find({ "owner.telegramId": telegramid });

    res.json({ success: true, data: wirds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = getWirds;
