function checkTelegramIdHeader(req, res, next) {
  const { telegramid } = req.headers;
  if (!telegramid) {
    return res.status(400).json({ message: "Missing telegramid header" });
  }
  next();
}

module.exports = { checkTelegramIdHeader };
