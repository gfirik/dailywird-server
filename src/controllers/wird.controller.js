const Wird = require("../models/wird.model.js");

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
    res.status(201).json({ success: true, data: wird });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function getWird(req, res) {}

async function editWird(req, res) {}

async function deleteWird(req, res) {}

module.exports = { createWird };
