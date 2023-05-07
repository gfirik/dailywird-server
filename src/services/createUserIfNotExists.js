const User = require("../models/user.model.js");

async function createUserIfNotExists(telegramId) {
  let user = await User.findOne({ telegramId });
  if (!user) {
    user = await User.create({ telegramId });
  }
  return user;
}

module.exports = { createUserIfNotExists };
