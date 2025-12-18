const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const moment = require('moment');

router.get("/", function (req, res) {
  const { companyID, supplierID, pur_sal, invoiceNo } = req.query;

  console.log("🔍 loadInvoiceTransaction request:", req.query);

  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "+00:00",
  });

  let sql = '';
  let params = [];

  if (pur_sal === 'P') {
    sql = `
      SELECT * FROM invoiceTxn 
      WHERE companyID = ? AND pur_sal = ? AND suppCustID = ? AND invoiceNo = ?
      ORDER BY txnDate
    `;
    params = [companyID, pur_sal, supplierID, invoiceNo];
  } else {
    sql = `
      SELECT * FROM invoiceTxn 
      WHERE companyID = ? AND pur_sal = ? AND invoiceNo = ?
      ORDER BY txnDate
    `;
    params = [companyID, pur_sal, invoiceNo];
  }

  db.query(sql, params, (err, results) => {
    db.end();

    if (err) {
      console.error("❌ invoiceTxn select DB Error:", err);
      return res.status(500).json({ error: 'Database error' });
    }

    console.log("✅ loadInvoiceTransaction returned", results.length, "rows");
    res.json(results);
  });
});

module.exports = router;