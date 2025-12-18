const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const moment = require('moment');

router.get("/", function (req, res) {
  const { companyID, gType, gType1, gType2 } = req.query;

  if (!companyID || (!gType && !gType1 && !gType2)) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const glTypes = [gType, gType1, gType2].filter(Boolean); // remove undefined/null

  const placeholders = glTypes.map(() => '?').join(','); // "?, ?, ?"
  const sql = `
    SELECT * FROM glAccount
    WHERE companyID = ? AND glType IN (${placeholders})
    ORDER BY glNo
  `;

  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "+00:00",
  });

  console.log('🔍 SQL:', sql);
  console.log('🔢 Params:', [companyID, ...glTypes]);

  db.query(sql, [companyID, ...glTypes], (err, results) => {
    db.end();

    if (err) {
      console.error("❌ G/L MultiSelect error:", err);
      return res.status(500).json({ error: 'Database error' });
    }

    console.log('✅ General Ledger fetched:', results.length);
    res.send(results);
  });
});

module.exports = router;
