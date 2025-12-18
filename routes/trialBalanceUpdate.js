const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "+00:00",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

router.post('/', async (req, res) => {
  const TBData = req.body;
  const companyID = TBData[0].companyID;
  const eDate = new Date(TBData[0].endDate);
  const year = eDate.getFullYear();

  console.log(TBData);
  console.log(year);

  try {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    for (let i = 0; i < TBData.length; i++) {
      const row = TBData[i];
      const dbquery = `
        INSERT INTO trialBalance 
        (companyID, year, startDate, endDate, glNo, glSub, glType, glName, drAmt, crAmt, date_close, date_created)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), CURDATE())
      `;
      await conn.query(dbquery, [
        companyID,
        year,
        row.startDate,
        row.endDate,
        row.glNo,
        row.glSub,
        row.glType,
        row.glName,
        row.debit,
        row.credit
      ]);
    }

    await conn.commit();
    conn.release();

    console.log("Trial Balance saved successfully");
    res.status(200).json({ message: "Trial Balance saved successfully" });

  } catch (err) {
    console.error("Error updating trial balance:", err);
    res.status(500).json({ error: "Trial Balance update failed" });
  }
});

module.exports = router;
