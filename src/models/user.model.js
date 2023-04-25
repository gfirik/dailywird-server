const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  wirds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wird" }],
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
