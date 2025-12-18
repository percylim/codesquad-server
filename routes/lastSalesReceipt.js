 const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const moment = require('moment');

router.get("/", async (req, res) => {
  res.setHeader('Cache-Control', 'no-store'); // Prevent browser caching

  const { companyID, jvInit } = req.query;

  if (!companyID || !jvInit) {
    return res.status(400).json({ error: "Missing companyID or jvInit" });
  }

  const likePattern = `${jvInit}-%`;

  const sql = `
    SELECT receiptNo,
           CAST(SUBSTRING_INDEX(receiptNo, '-', -1) AS UNSIGNED) AS docNum
    FROM invoiceTxn
    WHERE companyID = ?
      AND jvInit = ?
      AND receiptNo LIKE ?
    ORDER BY docNum DESC
    LIMIT 1
  `;

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "+00:00",
    });

    const [results] = await db.execute(sql, [companyID, jvInit, likePattern]);

    await db.end();

    console.log('✅ Query result:', results);

    res.json(results[0] || {}); // Send the latest receipt or empty if none
  } catch (err) {
    console.error('❌ DB Error in lastSalesReceipt:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
