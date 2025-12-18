// routes/longTermLiability.js
const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // MySQL pool

router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;
    if (!companyID || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters");
    }

    // 1. Load GL accounts (type 503)
    const [glAccounts] = await db.execute(
      `SELECT * 
       FROM glAccount 
       WHERE companyID = ? 
         AND glType = '503'
       ORDER BY glNo, glSub`,
      [companyID]
    );

    for (const acc of glAccounts) {
      const { glNo, glSub, opBalance } = acc;
      let sumBalance = 0;
      let curBalance = opBalance;

      // a) Sum before period
      const [beforeRows] = await db.execute(
        `SELECT SUM(drAmt - crAmt) AS sumBalance
         FROM journal
         WHERE companyID = ? AND glNo = ? AND glSub = ? AND txnDate < ?`,
        [companyID, glNo, glSub, startDate]
      );

      if (beforeRows[0].sumBalance !== null) {
        sumBalance = beforeRows[0].sumBalance;
        curBalance = opBalance + sumBalance;
      }

      // b) Transactions during period
      const [periodRows] = await db.execute(
        `SELECT drAmt, crAmt
         FROM journal
         WHERE companyID = ? AND glNo = ? AND glSub = ?
           AND txnDate >= ? AND txnDate <= ?
         ORDER BY txnDate, voucherNo ASC`,
        [companyID, glNo, glSub, startDate, endDate]
      );

      let drAmount = 0;
      let crAmount = 0;

      for (const row of periodRows) {
        drAmount += row.drAmt || 0;
        crAmount += Math.abs(row.crAmt) || 0;
      }

      const finBalance = opBalance + sumBalance + drAmount - crAmount;

      if (finBalance > 0) {
        acc.debit = finBalance;
        acc.credit = 0;
      } else {
        acc.debit = 0;
        acc.credit = finBalance;
      }
    }

    res.json(glAccounts);

  } catch (err) {
    console.error("Error loading long term liabilities:", err);
    res.status(500).send("Failed to load long term liability data");
  }
});

module.exports = router;