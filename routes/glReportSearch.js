const express = require('express');
const router = express.Router();
const moment = require('moment');
const pool = require('./dbDatabase');

// 📌 GET /api/glReportSearch?companyID=...&glNo=...&glSub=...&startDate=...&endDate=...
router.get("/", async (req, res) => {
  const { companyID, startDate, endDate, glNo, glSub } = req.query;

  if (!companyID || !glNo || !glSub || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  let conn;
  try {
    conn = await pool.getConnection();

    // 1️⃣ Get opening balance from glAccount
    const [acctRows] = await conn.query(
      `SELECT opBalance 
         FROM glAccount 
        WHERE companyID=? AND glNo=? AND glSub=?`,
      [companyID, glNo, glSub]
    );
    let opBalance = acctRows.length > 0 ? acctRows[0].opBalance || 0 : 0;

    // 2️⃣ Sum transactions before startDate
    const [sumRows] = await conn.query(
      `SELECT SUM(drAmt - crAmt) AS sumBalance
         FROM journal 
        WHERE companyID=? AND glNo=? AND glSub=? AND txnDate < ?`,
      [companyID, glNo, glSub, startDate]
    );
    let sumBalance = sumRows[0].sumBalance || 0;

    // starting balance
    let curBalance = opBalance + sumBalance;

    // 3️⃣ Load journal transactions within date range
    const [journalRows] = await conn.query(
      `SELECT * 
         FROM journal 
        WHERE companyID=? 
          AND glNo=? 
          AND glSub=? 
          AND txnDate BETWEEN ? AND ? 
        ORDER BY txnDate, voucherNo ASC`,
      [companyID, glNo, glSub, startDate, endDate]
    );

    if (journalRows.length > 0) {
      // first row: opening balance
      journalRows[0].opBal = curBalance;
      journalRows[0].curBal = curBalance + (journalRows[0].drAmt - journalRows[0].crAmt);
      curBalance = journalRows[0].curBal;

      // subsequent rows
      for (let i = 1; i < journalRows.length; i++) {
        journalRows[i].opBal = 0; // only first row shows opening balance
        journalRows[i].curBal = curBalance + (journalRows[i].drAmt - journalRows[i].crAmt);
        curBalance = journalRows[i].curBal;
      }

      return res.json(journalRows);
    } else {
      // no transactions in range → just return opening balance
      return res.json([{
        opBal: curBalance,
        drAmt: 0,
        crAmt: 0,
        curBal: curBalance
      }]);
    }

  } catch (err) {
    console.error("❌ GL Report Search Error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
