const Wird = require("../../models/wird.model.js");

async function updateWird(req, res) {
  try {
    const { wirdId } = req.params;
    const { completion, progress } = req.body;

    const wird = await Wird.findById(wirdId);
    if (!wird) {
      return res.status(404).json({ message: "Wird not found" });
    }

    if (completion !== undefined) {
      wird.completed = completion;
    }

    if (progress !== undefined && wird.counter.enabled) {
      wird.counter.count += progress;
    }

    await wird.save();

    res.status(200).json({ success: true, data: wird });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error while updating a wird" });
  }
}

module.exports = updateWird;
