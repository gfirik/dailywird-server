const User = require("../models/user.model.js");
const Wird = require("../models/wird.model.js");

async function deleteTelegramUser(userId) {
  const telegramId = userId.toString();
  try {
    await Wird.deleteMany({ "owner.telegramId": telegramId });
    await User.deleteOne({ telegramId: telegramId });
    console.log(`User with telegramId ${telegramId} has been deleted.`);
  } catch (error) {
    console.error(
      `Error deleting user with telegramId ${telegramId}: ${error}`
    );
  }
}
module.exports = { deleteTelegramUser };
