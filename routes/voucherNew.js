const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysql = require('mysql2/promise');
const pool = require('./dbDatabase'); 
// create pool once (reuse connections)
//const pool = mysql.createPool({
//  host: process.env.DB_HOST,
//  user: process.env.DB_USER,
//  password: process.env.DB_PASSWORD,
//  database: process.env.DB_NAME,
//  waitForConnections: true,
//  connectionLimit: 10,
// timezone: "+00:00"
//});

router.post('/', async (req, res) => {
  const voucherData = req.body;

  if (!Array.isArray(voucherData) || voucherData.length === 0) {
    return res.status(400).json({ error: 'No voucher data provided' });
  }

  const companyID = voucherData[0].companyID;
  const userName = voucherData[0].userName;
  const voucherNo = voucherData[0].voucherNo.toUpperCase();

  // ✅ Validate totals
  let drTotal = 0, crTotal = 0;
  for (let row of voucherData) {
    let drAmt = parseFloat(String(row.drAmt || "0").replace(/,/g, "")) || 0;
    let crAmt = parseFloat(String(row.crAmt || "0").replace(/,/g, "")) || 0;

    drTotal += drAmt;
    crTotal += crAmt;

    row.drAmt = drAmt;
    row.crAmt = crAmt;

    // normalize date
    if (row.txnDate) {
      row.txnDate = moment(row.txnDate, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("YYYY-MM-DD");
    }
  }

  if (drTotal.toFixed(2) !== crTotal.toFixed(2)) {
    return res.status(400).json({ error: 'Debit total and Credit total must be equal' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // ✅ Check duplicate voucher
    const [dupRows] = await conn.query(
      "SELECT 1 FROM journal WHERE companyID=? AND voucherNo=?",
      [companyID, voucherNo]
    );
    if (dupRows.length > 0) {
  await conn.rollback();
  return res.status(400).json({
    status: "Error",
    error: `Voucher No. ${voucherNo} already exists`
  });
}

    // ✅ Insert journal + update glAccount + update/insert glTxn
    for (let row of voucherData) {
      const { glNo, glSub, department, glName, jeParticular, drAmt, crAmt, txnDate } = row;
      const glAmount = drAmt - crAmt;

      // insert journal
      await conn.query(
        `INSERT INTO journal 
          (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, date_created) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'JV', CURDATE())`,
        [companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate]
      );

      // update glAccount balance
      await conn.query(
        `UPDATE glAccount 
            SET glAmount = glAmount + ? 
          WHERE companyID=? AND glNo=? AND glSub=? AND department=?`,
        [glAmount, companyID, glNo, glSub, department]
      );

      // check glTxn
      const [txnRows] = await conn.query(
        `SELECT txnAmount FROM glTxn 
          WHERE companyID=? AND glNo=? AND glSub=? AND department=? AND txnDate=?`,
        [companyID, glNo, glSub, department, txnDate]
      );

      if (txnRows.length > 0) {
        await conn.query(
          `UPDATE glTxn 
              SET txnAmount = txnAmount + ? 
            WHERE companyID=? AND glNo=? AND glSub=? AND department=? AND txnDate=?`,
          [glAmount, companyID, glNo, glSub, department, txnDate]
        );
      } else {
        await conn.query(
          `INSERT INTO glTxn 
            (companyID, glNo, glSub, department, glName, txnAmount, txnDate) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [companyID, glNo, glSub, department, glName, glAmount, txnDate]
        );
      }
    }

    // ✅ Commit all changes
    await conn.commit();
    return res.json({ status: "Success", voucherNo });
    

  } catch (err) {
    console.error("❌ Voucher save failed:", err);
    await conn.rollback();
    res.status(500).json({ error: "Voucher save failed", details: err.message });
  } finally {
    conn.release();
  }
});

module.exports = router;
