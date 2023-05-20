const Wird = require("../../models/wird.model.js");
const User = require("../../models/user.model.js");

async function deleteWird(req, res) {
  try {
    const { wirdId } = req.body;
    if (!wirdId) {
      return res.status(400).json({ message: "Missing wird id" });
    }

    const deletedWird = await Wird.findByIdAndDelete(wirdId);

    if (!deletedWird) {
      return res.status(404).json({ message: "Wird not found" });
    }

    const updateResult = await User.updateOne(
      { "wirds.wirdId": wirdId },
      { $pull: { wirds: { wirdId } } }
    );

    if (updateResult.nModified === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Wird deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = deleteWird;
