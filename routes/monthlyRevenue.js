const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "+00:00",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;
    if (!companyID || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log(`Fetching Monthly Revenue for: ${companyID}`);

    // 1️⃣ Get all GL accounts for sales, returns, etc.
    const [glAccounts] = await pool.query(
      `SELECT * 
       FROM glAccount 
       WHERE companyID = ? 
         AND (glType='201' OR glType='203' OR glType='205') 
       ORDER BY glType`,
      [companyID]
    );

    console.log(`Found ${glAccounts.length} GL accounts`);

    const resultsArray = [];

    // 2️⃣ Process each GL account sequentially
    for (const account of glAccounts) {
      let { glNo, glSub, opBalance } = account;
      let sumBalance = 0;

      // 2.1 Get sum of balances before start date
      const [sumRows] = await pool.query(
        `SELECT SUM(drAmt - crAmt) AS sumBalance 
         FROM journal 
         WHERE companyID = ? AND glNo = ? AND glSub = ? AND txnDate < ?`,
        [companyID, glNo, glSub, startDate]
      );

      if (sumRows.length > 0 && sumRows[0].sumBalance !== null) {
        sumBalance = sumRows[0].sumBalance;
      }

      // 2.2 Get transactions within date range
      const [txnRows] = await pool.query(
        `SELECT drAmt, crAmt 
         FROM journal 
         WHERE companyID = ? AND glNo = ? AND glSub = ? 
           AND txnDate >= ? AND txnDate <= ? 
         ORDER BY txnDate, voucherNo ASC`,
        [companyID, glNo, glSub, startDate, endDate]
      );

      let drAmount = 0;
      let crAmount = 0;

      for (const txn of txnRows) {
        drAmount += txn.drAmt || 0;
        crAmount += Math.abs(txn.crAmt || 0);
      }

      // 2.3 Calculate final balance
      const finBalance = opBalance + sumBalance + drAmount - crAmount;
      const debit = finBalance > 0 ? finBalance : 0;
      const credit = finBalance < 0 ? Math.abs(finBalance) : 0;

      resultsArray.push({
        ...account,
        debit,
        credit
      });
    }

    // 3️⃣ Send results
    res.json(resultsArray);

  } catch (err) {
    console.error('Error in monthlyRevenue:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
