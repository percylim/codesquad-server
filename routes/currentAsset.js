const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // shared MySQL pool

router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;
    if (!companyID || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters");
    }

    // 1. Load all current asset accounts (glType 401)
    const [accounts] = await db.execute(
      `SELECT * 
       FROM glAccount 
       WHERE companyID = ? 
         AND glType = '401'
       ORDER BY glNo, glSub`,
      [companyID]
    );

    if (!accounts.length) {
      return res.json([]);
    }

    // 2. Process each account
    for (const account of accounts) {
      const { glNo, glSub, opBalance } = account;
      let sumBalance = 0;
      let drAmount = 0;
      let crAmount = 0;
      let debit = 0;
      let credit = 0;

      // Sum opening balance before startDate
      const [sumRows] = await db.execute(
        `SELECT SUM(drAmt - crAmt) AS sumBalance
         FROM journal
         WHERE companyID = ? 
           AND glNo = ?
           AND glSub = ?
           AND txnDate < ?`,
        [companyID, glNo, glSub, startDate]
      );

      if (sumRows.length && sumRows[0].sumBalance !== null) {
        sumBalance = sumRows[0].sumBalance;
      }

      // Get transactions in date range
      const [txnRows] = await db.execute(
        `SELECT drAmt, crAmt
         FROM journal
         WHERE companyID = ? 
           AND glNo = ?
           AND glSub = ?
           AND txnDate >= ?
           AND txnDate <= ?
         ORDER BY txnDate, voucherNo ASC`,
        [companyID, glNo, glSub, startDate, endDate]
      );

      if (txnRows.length) {
        for (const txn of txnRows) {
          drAmount += txn.drAmt || 0;
          crAmount += Math.abs(txn.crAmt || 0);
        }
      }

      const finBalance = opBalance + sumBalance + drAmount - crAmount;

      if (finBalance > 0) {
        debit = finBalance;
        credit = 0;
      } else {
        credit = finBalance;
        debit = 0;
      }

      account.debit = debit;
      account.credit = credit;
    }

    // 3. Send updated account list
    res.json(accounts);

  } catch (err) {
    console.error("Error in currentAsset route:", err);
    res.status(500).send("Failed to load current asset data");
  }
});

module.exports = router;