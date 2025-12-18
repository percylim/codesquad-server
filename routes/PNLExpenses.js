const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // shared MySQL pool

router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;

    if (!companyID || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters");
    }

    // 1. Load GL accounts for expense types
    const [expAccounts] = await db.execute(
      `SELECT * FROM glAccount 
       WHERE companyID = ? AND (glType='301' OR glType='302' OR glType='304') 
       ORDER BY glType, glNo, glSub`,
      [companyID]
    );

    const cosData = [];

    // 2. Loop through each account and sum amounts
    for (const acc of expAccounts) {
      const [sumResult] = await db.execute(
        `SELECT SUM(drAmt - crAmt) AS sumBalance 
         FROM journal 
         WHERE companyID = ? 
           AND glNo = ? 
           AND glSub = ? 
           AND txnDate >= ? 
           AND txnDate <= ?`,
        [companyID, acc.glNo, acc.glSub, startDate, endDate]
      );

      const purAmt = sumResult[0]?.sumBalance || 0;

      if (purAmt > 0) {
        cosData.push({
          addNo: '',
          glName: acc.glName,
          totalText: '',
          amount: purAmt
        });
      }
    }

    res.json(cosData);

  } catch (err) {
    console.error("Error loading PNL expenses:", err);
    res.status(500).send("Failed to load PNL expenses");
  }
});

module.exports = router;
