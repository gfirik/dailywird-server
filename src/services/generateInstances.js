const moment = require("moment-timezone");
const { daysOfWeek } = require("../types/weekdays.js");

function generateInstances(startDate, repeatDays, repeatWeekly, userTimeZone) {
  // Validations
  const validatedStartDate = new Date(startDate);

  if (!moment(validatedStartDate).isValid()) {
    return { error: "startDate must be a valid Date object." };
  }

  if (!Array.isArray(repeatDays)) {
    return { error: "repeatDays must be an array." };
  }

  if (repeatDays.length > 0) {
    for (const day of repeatDays) {
      if (typeof day !== "string") {
        return { error: "Each repeatDay must be a string." };
      }
      if (!daysOfWeek.includes(day)) {
        return { error: `${day} is not a valid weekday name.` };
      }
    }
  }

  if (typeof repeatWeekly !== "boolean") {
    return { error: "repeatWeekly must be a boolean value." };
  }

  if (typeof userTimeZone !== "string") {
    return { error: "userTimeZone must be a string." };
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
