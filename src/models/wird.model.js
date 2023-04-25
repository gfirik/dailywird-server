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
  repeatDay: { type: String, enum: daysOfWeek },
  repeatWeekly: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Wird = mongoose.model("Wird", WirdSchema);

mmodule.exports = Wird;
