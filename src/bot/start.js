const { Telegraf, Markup } = require("telegraf");
const dotenv = require("dotenv");
const User = require("../models/user.model.js");
const { checkUserExists } = require("../services/checkUserExists.js");
const { deleteTelegramUser } = require("../services/deleteUser.js");

dotenv.config({ path: ".env" });
const { TELEGRAM_BOT_TOKEN, CLIENT_HOST } = process.env;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

async function launchBot() {
  try {
    await bot.catch((err, ctx) => {
      console.log(`Error for ${ctx.updateType}`, err);
    });

    bot.on("left_chat_member", async (ctx) => {
      const { id } = ctx.message.left_chat_member;

      await deleteTelegramUser(id);
    });

    await bot.start(async (ctx) => {
      const { first_name } = await ctx.from;
      const telegramId = await ctx.from.id.toString();

      const markup = Markup.inlineKeyboard([
        [Markup.button.webApp("DailyWird", CLIENT_HOST)],
      ]);

      const userExists = await checkUserExists(telegramId);
      if (!userExists) {
        const user = new User({ telegramId: telegramId });
        await user.save();
        await ctx.reply(`Hey! ${first_name}! Welcome to DailyWird`, markup);
      } else {
        ctx.reply(`Hey! ${first_name}! Welcome Back!`, markup);
      }
    });

    await bot.launch();
  } catch (error) {
    console.error("Error launching bot:", error);
  }
}

module.exports = { launchBot };
