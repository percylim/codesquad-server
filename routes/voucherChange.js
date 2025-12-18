const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const moment = require('moment');
const pool = require('./dbDatabase'); 

// ✅ Helper: Convert string with commas to float
function parseNumber(value) {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/,/g, '')) || 0;
  }
  return Number(value) || 0;
}

router.post('/', async (req, res) => {
  const voucherData = req.body;

  if (!Array.isArray(voucherData) || voucherData.length === 0) {
    return res.status(400).send("voucherData is empty or not an array");
  }

  const { companyID, userName, voucherNo } = voucherData[0] || {};

  if (!voucherNo || !companyID) {
    return res.status(400).send("Missing voucherNo or companyID");
  }

  console.log("🔄 Starting voucher update for:", voucherNo);

  try {
    const con = await pool.getConnection();
  

    // 1. Fetch original journal entries
    const [jvData] = await con.query(
      `SELECT * FROM journal WHERE companyID = ? AND voucherNo = ?`,
      [companyID, voucherNo]
    );

    if (jvData.length === 0) {
      console.log("❌ No journal found for voucher:", voucherNo);
       let jvData=voucherData;
      // for (const v of jvData) {
      //  v.voucherNo = voucherNo;
      // }
       return res.status(400).send("Invalid Voucher No.");
    }

    // 2. Backup to journalChange and reverse glAccount & glTxn
    for (const row of jvData) {
      const jvDate = moment(row.txnDate).format("YYYY-MM-DD");
      const drAmt = parseNumber(row.drAmt);
      const crAmt = parseNumber(row.crAmt);
      const glAmount = drAmt - crAmt;

      await con.query(
        `INSERT INTO journalChange (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, userChange, dateChange, status, reasons)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'JV', ?, CURDATE(), 'JV', 'Voucher Edit Change')`,
        [companyID, row.glNo, row.glSub, row.department, row.glName, row.jeParticular, row.voucherNo, drAmt, crAmt, row.userName, jvDate, userName]
      );

      await con.query(
        `UPDATE glAccount SET glAmount = glAmount - ? WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ?`,
        [glAmount, companyID, row.glNo, row.glSub, row.department]
      );

      const [txnRows] = await con.query(
        `SELECT * FROM glTxn WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ? AND txnDate = ?`,
        [companyID, row.glNo, row.glSub, row.department, jvDate]
      );

      if (txnRows.length > 0) {
        await con.query(
          `UPDATE glTxn SET txnAmount = txnAmount - ? WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ? AND txnDate = ?`,
          [glAmount, companyID, row.glNo, row.glSub, row.department, jvDate]
        );
      }
    }

    // 3. Delete the old journal
    await con.query(
      `DELETE FROM journal WHERE companyID = ? AND voucherNo = ?`,
      [companyID, voucherNo]
    );

    // 4. Insert new journal entries and update glTxn + glAccount
    for (const v of voucherData) {
      const txnDate = moment(v.txnDate, "YYYY-MM-DD").format("YYYY-MM-DD");
      const drAmt = parseNumber(v.drAmt);
      const crAmt = parseNumber(v.crAmt);
      const glAmount = drAmt - crAmt;

      await con.query(
        `INSERT INTO journal (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, date_created)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'JV', CURDATE())`,
        [companyID, v.glNo, v.glSub, v.department, v.glName, v.jeParticular, voucherNo, drAmt, crAmt, userName, txnDate]
      );

      const [existingTxn] = await con.query(
        `SELECT * FROM glTxn WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ? AND txnDate = ?`,
        [companyID, v.glNo, v.glSub, v.department, txnDate]
      );

      if (existingTxn.length > 0) {
        await con.query(
          `UPDATE glTxn SET txnAmount = txnAmount + ? WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ? AND txnDate = ?`,
          [glAmount, companyID, v.glNo, v.glSub, v.department, txnDate]
        );
      } else {
        await con.query(
          `INSERT INTO glTxn (companyID, glNo, glSub, department, glName, txnAmount, txnDate)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [companyID, v.glNo, v.glSub, v.department, v.glName, glAmount, txnDate]
        );
      }

      await con.query(
        `UPDATE glAccount SET glAmount = glAmount + ? WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ?`,
        [glAmount, companyID, v.glNo, v.glSub, v.department]
      );
    }

    await con.end();
    console.log(`✅ Voucher update complete: ${voucherNo}`);
    return res.send("Success");

  } catch (err) {
    console.error("❌ Voucher Update Error:", err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;