require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formulaRoutes = require('./routes/formulaRoutes');
//app.use('/api/formulas', formulaRoutes);
const Formula = require('./models/Formula');  // <-- Add here

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/formulas', formulaRoutes);

// Debug route here
app.get('/api/debug-formulas', async (req, res) => {
  try {
    const allFormulas = await Formula.find();
    console.log('Formulas found:', allFormulas.length);
    res.json(allFormulas);
  } catch (error) {
    console.error('Error fetching formulas:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
