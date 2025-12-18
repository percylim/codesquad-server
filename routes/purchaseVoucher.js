var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var moment = require('moment');

router.post('/', function (req, res) {
  const voucherData = req.body;
  const companyID = voucherData[0].companyID;
  const userName = voucherData[0].userName;
  const voucherNo = voucherData[0].voucherNo.toUpperCase();
  const jvInit = voucherNo.substring(0, 4);

  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "+00:00",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  let hasError = false;
  let completed = 0;

  for (let i = 0; i < voucherData.length; i++) {
    const row = voucherData[i];

    const glNo = row.glNo;
    const glSub = row.glSub;
    const department = row.department;
    const glName = row.glName;
    const glType = row.glType;
    const jeParticular = row.jeParticular;
    const txnDate = row.txnDate;
    const drAmt = parseFloat(Math.abs(row.drAmt)) || 0;
    const crAmt = parseFloat(Math.abs(row.crAmt)) || 0;
    const glAmount = drAmt - crAmt;

    // 1. INSERT into journal
    const journalQuery = `
      INSERT INTO journal (companyID, glNo, glSub, department, glName, jeParticular, jvInit, voucherNo, drAmt, crAmt, userName, txnDate, voucherType, date_created)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'JV', CURDATE())
    `;
    const journalValues = [companyID, glNo, glSub, department, glName, jeParticular, jvInit, voucherNo, drAmt, crAmt, userName, txnDate];

    con.query(journalQuery, journalValues, function (err) {
      if (hasError) return;
      if (err) {
        hasError = true;
        console.error("❌ Journal insert DB Error:", err);
        return res.status(500).json({ error: 'Database error' });
      }
      console.log("Journal entry inserted.");
    });

    // 2. UPDATE glAccount
    const glAccountQuery = `
      UPDATE glAccount SET glAmount = glAmount + ? 
      WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ?
    `;
    const glAccountValues = [glAmount, companyID, glNo, glSub, department];

    con.query(glAccountQuery, glAccountValues, function (err) {
      if (hasError) return;
      if (err) {
        hasError = true;
        console.error("❌ glAccount update DB Error:", err);
        return res.status(500).json({ error: 'Database error' });
      }
      console.log("glAccount updated.");
    });

    // 3. UPSERT into glTxn
    const glTxnSelectQuery = `
      SELECT * FROM glTxn 
      WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ? AND txnDate = ?
    `;
    const glTxnValues = [companyID, glNo, glSub, department, txnDate];

    con.query(glTxnSelectQuery, glTxnValues, function (err, rows) {
      if (hasError) return;
      if (err) {
        hasError = true;
        console.error("❌ glTxn SELECT error:", err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (rows.length > 0) {
        // Update existing
        const updateQuery = `
          UPDATE glTxn SET txnAmount = txnAmount + ?
          WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ? AND txnDate = ?
        `;
        const updateValues = [glAmount, companyID, glNo, glSub, department, txnDate];

        con.query(updateQuery, updateValues, function (err) {
          if (hasError) return;
          if (err) {
            hasError = true;
            console.error("❌ glTxn UPDATE error:", err);
            return res.status(500).json({ error: 'Database error' });
          }

          checkComplete();
        });
      } else {
        // Insert new
        const insertQuery = `
          INSERT INTO glTxn (companyID, glNo, glSub, department, glName, txnAmount, txnDate)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const insertValues = [companyID, glNo, glSub, department, glName, glAmount, txnDate];

        con.query(insertQuery, insertValues, function (err) {
          if (hasError) return;
          if (err) {
            hasError = true;
            console.error("❌ glTxn INSERT error:", err);
            return res.status(500).json({ error: 'Database error' });
          }

          checkComplete();
        });
      }
    });
  }

  function checkComplete() {
    completed++;
    if (completed === voucherData.length) {
      res.send("Success");
      con.end();
    }
  }
});

module.exports = router;