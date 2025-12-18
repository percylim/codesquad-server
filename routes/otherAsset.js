// routes/otherAsset.js
const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // MySQL pool

// GET other assets
router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;
    if (!companyID || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters");
    }

    // 1. Get all other asset accounts (glType 403)
    const [glAccounts] = await db.execute(
      `SELECT * 
       FROM glAccount 
       WHERE companyID = ? AND glType = '403'
       ORDER BY glNo, glSub`,
      [companyID]
    );

    // 2. Loop through accounts and calculate balances
    for (const acc of glAccounts) {
      let { glNo, glSub, opBalance } = acc;

      let curBalance = opBalance;
      let sumBalance = 0;

      // 2a. Sum journal entries before startDate
      const [beforeRows] = await db.execute(
        `SELECT SUM(drAmt - crAmt) AS sumBalance
         FROM journal
         WHERE companyID = ? AND glNo = ? AND glSub = ? AND txnDate < ?`,
        [companyID, glNo, glSub, startDate]
      );
      if (beforeRows.length && beforeRows[0].sumBalance !== null) {
        sumBalance = beforeRows[0].sumBalance;
        curBalance += sumBalance;
      }

      // 2b. Get journal transactions in the date range
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

      // 2c. Final debit/credit calculation
      const finBalance = opBalance + sumBalance + drAmount - crAmount;
      if (finBalance > 0) {
        acc.debit = finBalance;
        acc.credit = 0;
      } else {
        acc.credit = finBalance;
        acc.debit = 0;
      }
    }

    // 3. Send the results
    res.json(glAccounts);

  } catch (err) {
    console.error("Error in otherAsset route:", err);
    res.status(500).send("Failed to load other asset data");
  }
});

module.exports = router;