 const express = require('express');
 const router = express.Router();
 const mysql = require('mysql2/promise');
 const moment = require('moment');
 
 router.get("/", async function(req, res) {
  const { companyID, startDate, endDate } = req.query;
  const pur_sal = 'S';

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "+00:00",
    });

    console.log("🔄 Starting Sales Yearly Report");

    const sql = `
      SELECT * FROM invoiceTxn 
      WHERE companyID = ? 
        AND pur_sal = ? 
        AND invType IN ('SAL', 'SCN', 'SDN', 'SRN')
        AND txnDate >= ? 
        AND txnDate <= ?
      ORDER BY txnDate
    `;

    const [result] = await db.query(sql, [companyID, pur_sal, startDate, endDate]);

    await db.end();
    res.json(result || []);
  } catch (err) {
    console.error('❌ Error during sales yearly report:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;