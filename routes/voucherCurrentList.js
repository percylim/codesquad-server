const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const moment = require('moment');

router.get("/", function(req, res) {
const { companyID, voucherNo } = req.query;
console.log("🔍 Company:", companyID, "| Voucher No:", voucherNo);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "+00:00",
});

const sql = "SELECT * FROM journal WHERE companyID = ? AND voucherNo = ?";
db.query(sql, [companyID, voucherNo], (err, results) => {
  if (err) {
    console.error('❌ DB Error:', err);
    return res.status(500).json({ error: 'Database error' });
  }

  if (results.length > 0) {
    console.log("✅ Voucher found:", results.length);
    res.json(results);
  } else {
    // Option 1 (Preferred): return empty array for cleaner frontend handling
    res.json([]);
    // Option 2: send message and handle in frontend:
    // res.status(404).send({ message: `Voucher No. ${voucherNo} has been deleted` });
  }

  db.end();
});
});

module.exports = router;
