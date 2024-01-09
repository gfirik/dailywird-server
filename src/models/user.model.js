const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    telegramId: { type: String, required: true, unique: true },
    wirds: [
      {
        wirdId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Wird",
          required: true,
        },
        title: { type: String, required: true },
        ownerTelegramId: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

module.exports = User;
