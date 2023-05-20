const User = require("../models/user.model.js");

async function createUserIfNotExists(telegramId) {
  const user = await User.create({ telegramId });
  return user;
}

module.exports = { createUserIfNotExists };
