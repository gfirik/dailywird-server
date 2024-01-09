const User = require("../models/user.model.js");
const Wird = require("../models/wird.model.js");

async function deleteTelegramUser(userId) {
  const telegramId = userId.toString();
  try {
    await Wird.deleteMany({ "owner.telegramId": telegramId }).then(
      console.log("wirds deleted successfully")
    );
    await User.deleteOne({ telegramId: telegramId }).then(
      console.log(
        `User with telegramId ${telegramId} and their data have been deleted.`
      )
    );
  } catch (error) {
    console.error(
      `Error deleting user with telegramId ${telegramId}: ${error}`
    );
    throw error;
  }
}
module.exports = { deleteTelegramUser };
