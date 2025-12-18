  const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // shared MySQL pool

router.get('/', async (req, res) => {
  try {
    const { companyID, profit } = req.query;

    if (!companyID || profit === undefined) {
      return res.status(400).send("Missing required parameters");
    }

    // Ensure profit is a number
    const profitValue = parseFloat(profit);
    if (isNaN(profitValue)) {
      return res.status(400).send("Profit must be a number");
    }

    const [rows] = await db.execute(
      `SELECT * 
       FROM incomeTax 
       WHERE companyID = ? 
         AND ? >= incomeFrom 
         AND ? <= incomeTo`,
      [companyID, profitValue, profitValue]
    );

    res.json(rows);

  } catch (err) {
    console.error("Error loading tax computation:", err);
    res.status(500).send("Failed to load tax computation");
  }
});

module.exports = router;