const Wird = require("../../models/wird.model.js");

async function getWirdById(req, res) {
  try {
    const { wirdId } = req.params;
    if (!wirdId) {
      return res.status(400).json({ message: "Missing wird ID" });
    }

    const wird = await Wird.findById(wirdId);
    if (!wird) {
      return res.status(404).json({ message: "Wird not found" });
    }

    res.json({ success: true, data: wird });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = getWirdById;
