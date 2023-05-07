const mongoose = require("mongoose");

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WirdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date, default: Date.now },
  repeatDay: { type: String, enum: daysOfWeek },
  repeatWeekly: { type: Boolean, default: false },
  startDate: { type: Date },
  remindOnStart: { type: Boolean, default: false },
  completionDate: { type: Date },
  remindOnCompleted: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  counter: { type: Number, default: 0 },
  owner: {
    telegramId: { type: String, required: true },
  },
});

const Wird = mongoose.model("Wird", WirdSchema);

module.exports = Wird;
