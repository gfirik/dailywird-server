const { Bot } = require("grammy");
const { run } = require("@grammyjs/runner");
const dotenv = require("dotenv");
const {
  checkUserExists,
  createUserIfNotExists,
  deleteTelegramUser,
} = require("../services");
const { handleIncomingMessage } = require("./utils");

dotenv.config({ path: ".env" });
const { TELEGRAM_BOT_TOKEN } = process.env;

async function welcomeUser(ctx) {
  const { first_name } = ctx.from;
  const telegramId = ctx.from.id.toString();

  const userExists = await checkUserExists(telegramId);
  if (!userExists) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const newUser = await createUserIfNotExists(telegramId, userTimeZone);
    console.log(`New user created with telegram id: ${newUser.telegramId}`);
    await ctx.reply(`Hey! ${first_name}! Welcome to DailyWird`);
  } else {
    try {
      await ctx.reply(`Hey! ${first_name}! Welcome Back!`);
    } catch (err) {
      if (err.name === "GrammyError" || err.error_code === 403) {
        console.log(`The bot was blocked by the user ${ctx.chat.id}`);
        console.log("Deleting the user in 10 seconds");
        setTimeout(() => deleteTelegramUser(ctx.chat.id), 5000);
      }
    }
  }
}

const errorHandler = (err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
};

async function launchBot() {
  const bot = new Bot(TELEGRAM_BOT_TOKEN);
  bot.command("start", welcomeUser);

  bot.on("message", handleIncomingMessage);

  bot.catch(errorHandler);

  return run(bot);
}

module.exports = { launchBot };
