const { deleteTelegramUser } = require("../../services/deleteTelegramUser.js");

const handleErrors = (error, userId) => {
  console.log(error);
  if (error.response && error.response.error_code === 403) {
    console.log("delete started");
    deleteTelegramUser(userId);
    console.log(`delete finished`);
  }
};

function handleIncomingMessage(ctx) {
  const telegramId = ctx.from.id.toString();
  console.log(ctx.message);

  try {
    setTimeout(() => {
      console.log(
        `Received message from ${ctx.from.first_name}: ${ctx.message.text}`
      );
      ctx.reply("Thanks for your message!").catch((error) => {
        handleErrors(error, telegramId);
      });
    }, 7000);
  } catch (error) {
    console.log(`Error for ${ctx.updateType}`, error);
  }
}

module.exports = handleIncomingMessage;
