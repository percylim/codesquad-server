// routes/accountPayable.js
const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // MySQL pool

router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;
    if (!companyID || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters");
    }

    // 1. Load AP GL accounts (types 801 or 204)
    const [glAccounts] = await db.execute(
      `SELECT * 
       FROM glAccount 
       WHERE companyID = ? 
         AND (glType = '801' OR glType = '204')
       ORDER BY glNo, glSub`,
      [companyID]
    );

    for (const acc of glAccounts) {
      const { glNo, glSub, glType, opBalance } = acc;
      let curBalance = 0;
      let sumBalance = 0;

      // a) Sum before period
      const [beforeRows] = await db.execute(
        `SELECT SUM(drAmt - crAmt) AS sumBalance
         FROM journal
         WHERE companyID = ? AND glNo = ? AND glSub = ? AND txnDate < ?`,
        [companyID, glNo, glSub, startDate]
      );

      if (beforeRows.length && beforeRows[0].sumBalance !== null) {
        curBalance = opBalance + beforeRows[0].sumBalance;
      } else {
        curBalance = opBalance;
      }

      // b) Sum during period
      const [periodRows] = await db.execute(
        `SELECT SUM(drAmt - crAmt) AS sumApBalance
         FROM journal
         WHERE companyID = ? AND glNo = ? AND glSub = ?
           AND txnDate >= ? AND txnDate <= ?`,
        [companyID, glNo, glSub, startDate, endDate]
      );

      sumBalance = periodRows[0].sumApBalance || 0;

      // c) Compute final balance (skip for glType 204?)
      let finBalance;
      if (glType === '204') {
        finBalance = curBalance; // if your original logic intended this
      } else {
        finBalance = curBalance + sumBalance;
      }

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
    console.error("Error loading account payable:", err);
    res.status(500).send("Failed to load account payable data");
  }
});

module.exports = router;
