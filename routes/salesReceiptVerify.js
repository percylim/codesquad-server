 const express = require('express');
 const router = express.Router();
 const mysql = require('mysql2/promise');
 const moment = require('moment');
 
 router.get("/", async (req, res) => {
  const { companyID, receiptNo } = req.query;

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "+00:00",
    });

    const [result] = await db.query(
      "SELECT * FROM invoiceTxn WHERE companyID = ? AND receiptNo = ?",
      [companyID, receiptNo]
    );

    await db.end();
    res.json(result[0] || {});
  } catch (err) {
    console.error("❌ salesReceiptVerify error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
