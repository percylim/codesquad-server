const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // MySQL pool

router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;
    if (!companyID || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters");
    }

    // 1. Load all accounts with glType 802 or 203
    const [accounts] = await db.execute(
      `SELECT * 
       FROM glAccount 
       WHERE companyID = ? 
         AND (glType = '802' OR glType = '203')
       ORDER BY glNo, glSub`,
      [companyID]
    );

    if (!accounts.length) {
      return res.json([]);
    }

    // 2. Calculate balances for each account
    for (const account of accounts) {
      let debit = 0;
      let credit = 0;
      let curBalance = 0;
      let sumBalance = 0;

      // Opening balance before startDate
      const [beforeRows] = await db.execute(
        `SELECT SUM(crAmt - drAmt) AS sumBalance
         FROM journal
         WHERE companyID = ?
           AND glNo = ?
           AND glSub = ?
           AND txnDate < ?`,
        [companyID, account.glNo, account.glSub, startDate]
      );

      if (beforeRows.length && beforeRows[0].sumBalance !== null) {
        curBalance = account.opBalance - beforeRows[0].sumBalance;
      } else {
        curBalance = account.opBalance;
      }

      if (curBalance === null) {
        curBalance = 0;
      }

      // Journal sum in date range
      const [rangeRows] = await db.execute(
        `SELECT SUM(crAmt - drAmt) AS JnSumBal
         FROM journal
         WHERE companyID = ?
           AND glNo = ?
           AND glSub = ?
           AND txnDate >= ?
           AND txnDate <= ?`,
        [companyID, account.glNo, account.glSub, startDate, endDate]
      );

      if (rangeRows.length && rangeRows[0].JnSumBal !== null) {
        sumBalance = rangeRows[0].JnSumBal;
      } else {
        sumBalance = 0;
      }

      // Apply debit/credit logic
      if ((curBalance - sumBalance) > 0) {
        if (account.glType !== '203') {
          debit = curBalance - sumBalance;
        }
        credit = 0;
      } else {
        if (account.glType !== '203') {
          credit = curBalance - sumBalance;
        }
        debit = 0;
      }

      account.debit = debit;
      account.credit = credit;
    }

    // 3. Send updated accounts
    res.json(accounts);

  } catch (err) {
    console.error("Error in accountReceivable route:", err);
    res.status(500).send("Failed to load account receivable data");
  }
});

module.exports = router;