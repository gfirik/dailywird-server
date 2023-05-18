const { Telegraf, Markup } = require("telegraf");
const dotenv = require("dotenv");
const { checkUserExists } = require("../services/checkUserExists.js");
const { deleteTelegramUser } = require("../services/deleteUser.js");
const {
  createUserIfNotExists,
} = require("../services/createUserIfNotExists.js");
const { handleErrors } = require("./handleErrors.js");

dotenv.config({ path: ".env" });
const { TELEGRAM_BOT_TOKEN, CLIENT_HOST } = process.env;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

async function launchBot() {
  try {
    await bot.catch((err, ctx) => {
      console.log(`Error for ${ctx.updateType}`, err);
    });

    await bot.start(async (ctx) => {
      const { first_name } = await ctx.from;
      const telegramId = await ctx.from.id.toString();

      const markup = Markup.inlineKeyboard([
        [Markup.button.webApp("DailyWird", CLIENT_HOST)],
      ]);

      const userExists = await checkUserExists(telegramId);

      if (!userExists) {
        const newUser = await createUserIfNotExists(telegramId);
        console.log(`New user created with telegram id: ${newUser.telegramId}`);
        await ctx.reply(`Hey! ${first_name}! Welcome to DailyWird`, markup);
      } else {
        ctx.reply(`Hey! ${first_name}! Welcome Back!`, markup);
      }
    });

    // following function need to be deleted before production, as its meant to test performance
    // but should not be deleted before that as it will be used to test performance
    await bot.on("message", async (ctx) => {
      const telegramId = await ctx.from.id.toString();

      try {
        setTimeout(() => {
          console.log(
            `Received message from ${ctx.from.first_name}: ${ctx.message.text}`
          );
          ctx.sendMessage("Thanks for your message!").catch((error) => {
            handleErrors(error, telegramId);
          });
        }, 7000);
      } catch (error) {
        console.log(`Error for ${ctx.updateType}`, error);
      }
    });

    await bot.launch();
  } catch (error) {
    console.error("Error launching bot:", error);
    throw error;
  }
}

module.exports = { launchBot };
