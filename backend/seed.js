require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Formula = require('./models/Formula');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected (for seeding)");
    return insertFormulas();
  })
  .catch(err => console.error("❌ MongoDB connect error:", err));

async function insertFormulas() {
  try {
    const data = fs.readFileSync(__dirname + '/formulas.json', 'utf-8');
    const formulas = JSON.parse(data);

    await Formula.deleteMany(); // clear old data
    await Formula.insertMany(formulas);

    console.log("✅ All formulas inserted!");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Insert error:", error);
  }
}
