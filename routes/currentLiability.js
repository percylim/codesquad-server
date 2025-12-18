// routes/currentLiability.js
const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // shared MySQL pool

router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;
    if (!companyID || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters");
    }

    // 1. Load current liabilities (glType 408 or 501)
    const [glAccounts] = await db.execute(
      `SELECT * 
       FROM glAccount 
       WHERE companyID = ? AND (glType = '408' OR glType = '501')
       ORDER BY glType, glNo, glSub`,
      [companyID]
    );

    // 2. Loop through accounts to calculate balances
    for (const acc of glAccounts) {
      let { glNo, glSub, opBalance } = acc;
      let sumBalance = 0;

      // a) Sum journal entries before startDate
      const [beforeRows] = await db.execute(
        `SELECT SUM(drAmt - crAmt) AS sumBalance
         FROM journal
         WHERE companyID = ? AND glNo = ? AND glSub = ? AND txnDate < ?`,
        [companyID, glNo, glSub, startDate]
      );
      if (beforeRows.length && beforeRows[0].sumBalance !== null) {
        sumBalance = beforeRows[0].sumBalance;
      }

      // b) Get transactions in the range
      const [journalRows] = await db.execute(
        `SELECT drAmt, crAmt
         FROM journal
         WHERE companyID = ? AND glNo = ? AND glSub = ?
           AND txnDate >= ? AND txnDate <= ?
         ORDER BY txnDate, voucherNo ASC`,
        [companyID, glNo, glSub, startDate, endDate]
      );

      let drAmount = 0;
      let crAmount = 0;
      for (const row of journalRows) {
        drAmount += row.drAmt || 0;
        crAmount += Math.abs(row.crAmt || 0);
      }

      // c) Calculate final balance
      const finBalance = opBalance + sumBalance + drAmount - crAmount;
      if (finBalance > 0) {
        acc.debit = finBalance;
        acc.credit = 0;
      } else {
        acc.credit = finBalance;
        acc.debit = 0;
      }
    }

    // 3. Send result
    res.json(glAccounts);

  } catch (err) {
    console.error("Error in currentLiability route:", err);
    res.status(500).send("Failed to load current liability data");
  }
});

module.exports = router;
