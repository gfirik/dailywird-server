const mongoose = require("mongoose");
const { daysOfWeek } = require("../types/weekdays.js");

const WirdSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    repeatDays: [{ type: String, enum: daysOfWeek }],
    repeatWeekly: { type: Boolean, default: false },
    startDate: { type: Date },
    remindOnStart: { type: Boolean, default: false },
    completionDate: { type: Date },
    remindOnCompleted: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    counter: {
      type: {
        enabled: { type: Boolean, default: false },
        target: { type: Number },
        count: { type: Number, default: 0 },
      },
      default: { enabled: false, target: null, count: 0 },
    },
    owner: {
      telegramId: { type: String, required: true },
    },
    instances: [
      {
        date: { type: Date },
        completed: { type: Boolean, default: false },
        progress: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const Wird = mongoose.model("Wird", WirdSchema);

module.exports = Wird;
