const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  wirds: [
    {
      mongoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wird",
        required: true,
      },
      telegramId: { type: String, required: true },
    },
  ],
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
