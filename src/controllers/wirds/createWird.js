const Wird = require("../../models/wird.model.js");
const User = require("../../models/user.model.js");

async function createWird(req, res) {
  try {
    const { telegramid } = req.headers;
    if (!telegramid) {
      return res.status(400).json({ message: "Missing telegramid header" });
    }

    const {
      title,
      description,
      repeatDay,
      repeatWeekly,
      startDate,
      remindOnStart,
      completionDate,
      remindOnCompleted,
      counter,
    } = req.body;

    const wird = await Wird.create({
      title,
      description,
      repeatDay,
      repeatWeekly,
      startDate,
      remindOnStart,
      completionDate,
      remindOnCompleted,
      counter,
      owner: { telegramId: telegramid },
    });
    const user = await User.findOne({ telegramId: telegramid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wirds.push({
      wirdId: wird._id,
      title: wird.title,
      ownerTelegramId: wird.owner.telegramId,
    });
    await user.save();

    res.status(201).json({ success: true, data: wird });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error while creating a wird" });
  }
}

module.exports = createWird;
