const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
require('dotenv').config();

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
  const { companyID, startDate, endDate } = req.query;

  try {
    const conn = await pool.getConnection();

    // Get all GL Accounts
    const [glAccounts] = await conn.query(
      `SELECT * FROM glAccount WHERE companyID = ? ORDER BY glNo, glSub`,
      [companyID]
    );

    for (let j = 0; j < glAccounts.length; j++) {
      const acc = glAccounts[j];
      const opBalance = acc.opBalance;

      // Sum drAmt-crAmt before start date
      const [sumRows] = await conn.query(
        `SELECT SUM(drAmt - crAmt) AS sumBalance
         FROM journal 
         WHERE companyID = ? AND glNo = ? AND glSub = ? AND txnDate < ?`,
        [companyID, acc.glNo, acc.glSub, startDate]
      );

      let sumBalance = sumRows[0].sumBalance || 0;

      // Load journal entries within date range
      const [txnRows] = await conn.query(
        `SELECT * FROM journal 
         WHERE companyID = ? AND glNo = ? AND glSub = ? 
         AND txnDate >= ? AND txnDate <= ? 
         ORDER BY txnDate, voucherNo ASC`,
        [companyID, acc.glNo, acc.glSub, startDate, endDate]
      );

      let drAmount = 0;
      let crAmount = 0;

      txnRows.forEach(row => {
        drAmount += row.drAmt;
        crAmount += row.crAmt;
      });

      const finBalance = opBalance + sumBalance + drAmount - crAmount;

      if (finBalance > 0) {
        acc.debit = finBalance;
        acc.credit = 0;
      } else {
        acc.credit = Math.abs(finBalance);
        acc.debit = 0;
      }
    }

    conn.release();
    res.json(glAccounts);

  } catch (err) {
    console.error("Error in monthlyTrialBalance:", err);
    res.status(500).json({ error: "Failed to load monthly trial balance" });
  }
});

module.exports = router;
