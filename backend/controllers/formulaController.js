const Formula = require('../models/Formula');

// Flexible search endpoint using regex (case-insensitive)
const searchFormula = async (req, res) => {
  const query = req.params.query?.trim();
  console.log('🔍 Searching for:', query);

  try {
    const formula = await Formula.findOne({
      name: { $regex: new RegExp(query, 'i') } // partial or exact match, case-insensitive
    });

    if (!formula) {
      return res.status(404).json({ message: "Formula not found" });
    }

    res.json(formula);
  } catch (err) {
    console.error("🔥 Search Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { searchFormula };
