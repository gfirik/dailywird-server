const Wird = require("../../models/wird.model.js");
const User = require("../../models/user.model.js");
const { generateInstances } = require("../../services/generateInstances.js");

async function createWird(req, res) {
  try {
    const { telegramid } = req.headers;
    if (!telegramid) {
      return res.status(400).json({ message: "Missing telegramid header" });
    }

    const {
      title,
      description,
      repeatDays,
      repeatWeekly,
      startDate,
      remindOnStart,
      completionDate,
      remindOnCompleted,
      counter,
    } = req.body;

    const user = await User.findOne({ telegramId: telegramid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userTimeZone = user.timeZone || "UTC";

    const instances = generateInstances(
      startDate,
      repeatDays,
      repeatWeekly,
      userTimeZone
    );

    const wird = await Wird.create({
      title,
      description,
      repeatDays,
      repeatWeekly,
      startDate,
      remindOnStart,
      completionDate,
      remindOnCompleted,
      completed: false,
      counter,
      owner: { telegramId: telegramid },
      instances,
    });

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
