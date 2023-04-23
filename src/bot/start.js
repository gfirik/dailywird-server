const { Telegraf, Markup } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.dev" }); // need to change to .end.prod once its ready

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

async function launchBot() {
  try {
    await bot.catch((err, ctx) => {
      console.log(`Error for ${ctx.updateType}`, err);
    });

    await bot.start(async (ctx) => {
      const { first_name } = ctx.from;
      const chat_id = ctx.chat.id;
      console.log(chat_id);
      await ctx.reply(`Hey! ${first_name}`);
      await ctx.reply(
        "Stay focused on your path with DailyWird",
        Markup.inlineKeyboard([
          [Markup.button.webApp("DailyWird", "https://gfirik.vercel.app")],
        ])
      );
      // ctx.setChatMenuButton({
      //   text: "DailyWird",
      //   url: "https://gfirik.vercel.app",
      // });
    });

    await bot.launch();
  } catch (error) {
    console.error("Error launching bot:", error);
  }
}

module.exports = { launchBot };
