const mongoose = require('mongoose');

const explanationNodeSchema = new mongoose.Schema({
  element: String,
  count: Number,
  children: [this]  // recursive schema for tree structure
}, { _id: false });

const formulaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  formula: { type: String, required: true },
  molarMass: { type: Number, required: true },
  atoms: [String],
  explanationTree: explanationNodeSchema
});

module.exports = mongoose.model('Formula', formulaSchema);
