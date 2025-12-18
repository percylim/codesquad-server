const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const moment = require('moment');

router.get("/", function(req, res) {
const { companyID, startDate, endDate } = req.query;
console.log("🔍 Edit Search | Company:", companyID, "| From:", startDate, "| To:", endDate);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "+00:00",
});

const sql = `
  SELECT * FROM journalChange
  WHERE companyID = ?
    AND dateChange >= ?
    AND dateChange <= ?
  ORDER BY voucherNo ASC
`;

db.query(sql, [companyID, startDate, endDate], (err, results) => {
  if (err) {
    console.error('❌ DB Error:', err);
    return res.status(500).json({ error: 'Database error' });
  }

  if (results.length > 0) {
    console.log(`✅ ${results.length} records found`);
    res.json(results);
  } else {
    // Option 1 – preferred:
    res.json([]);
    // Option 2 – if frontend handles it:
    // res.status(404).json({ message: `No edited records between ${startDate} and ${endDate}` });
  }

  db.end();
});
});

module.exports = router;
