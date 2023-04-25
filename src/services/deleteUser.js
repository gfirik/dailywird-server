const User = require("../models/user.model.js");

async function deleteTelegramUser(userId) {
  try {
    await User.deleteOne({ telegramId: userId.toString() });
    console.log(`User with telegramId ${userId} has been deleted.`);
  } catch (error) {
    console.error(`Error deleting user with telegramId ${userId}: ${error}`);
  }
}
module.exports = { deleteTelegramUser };
