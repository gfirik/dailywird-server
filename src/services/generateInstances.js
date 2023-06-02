const moment = require("moment-timezone");

function generateInstances(startDate, repeatDays, repeatWeekly, userTimeZone) {
  // Validations
  const validatedStartDate = new Date(startDate);
  if (!moment(validatedStartDate).isValid()) {
    throw new Error("startDate must be a valid Date object.");
  }

  if (!Array.isArray(repeatDays) || repeatDays.length === 0) {
    throw new Error("repeatDays must be a non-empty array.");
  }

  for (const day of repeatDays) {
    if (typeof day !== "string") {
      throw new Error("Each repeatDay must be a string.");
    }
  }

  if (typeof repeatWeekly !== "boolean") {
    throw new Error("repeatWeekly must be a boolean value.");
  }

  if (typeof userTimeZone !== "string") {
    throw new Error("userTimeZone must be a string.");
  }
  // End of validations

  const instances = [];
  const userMoment = moment.tz(validatedStartDate, userTimeZone);

  let currentDate = userMoment.clone();
  const maxDuration = 365;

  for (let i = 0; i < maxDuration; i++) {
    if (repeatDays.includes(currentDate.format("dddd"))) {
      instances.push({
        date: currentDate.toDate(),
        completed: false,
        progress: 0,
      });
    }

    currentDate.add(1, "day");

    if (!repeatWeekly && !repeatDays.includes(currentDate.format("dddd"))) {
      break;
    }
  }

  return instances;
}

module.exports = { generateInstances };
