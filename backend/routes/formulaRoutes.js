const express = require('express');
const router = express.Router();
const Formula = require('../models/Formula');
const { searchFormula } = require('../controllers/formulaController');

// ✅ ADD THIS BEFORE THE NEXT ONE
router.get('/search/:query', searchFormula);

// This route handles direct tree explanation
router.get('/:name', async (req, res) => {
  try {
    const formula = await Formula.findOne({
      name: { $regex: new RegExp(`^${req.params.name}$`, 'i') }
    });

    if (!formula) return res.status(404).json({ error: "Formula not found" });

    function dfsExplain(node) {
      if (!node) return '';
      let str = `${node.count || 1} x ${node.element}`;
      if (node.children && node.children.length > 0) {
        str += ' => [ ' + node.children.map(child => dfsExplain(child)).join(', ') + ' ]';
      }
      return str;
    }

    const explanation = dfsExplain(formula.explanationTree);
    res.json({ formula, explanation });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
