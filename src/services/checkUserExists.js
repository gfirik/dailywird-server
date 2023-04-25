const User = require("../models/user.model.js");

async function checkUserExists(telegramId) {
  const user = await User.findOne({ telegramId });
  return user ? true : false;
}

module.exports = { checkUserExists };
