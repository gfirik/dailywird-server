const User = require("../models/user.model.js");

async function createUserIfNotExists(telegramId, timezone) {
  const user = await User.create({ telegramId, timezone });
  return user;
}

module.exports = { createUserIfNotExists };
