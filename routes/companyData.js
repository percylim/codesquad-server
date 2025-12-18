// routes/companyData.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

router.post('/', async (req, res) => {
  const { companyID } = req.body;
  if (!companyID) return res.status(400).json({ error: 'Missing companyID' });

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await db.query('SELECT * FROM company WHERE companyID = ?', [companyID]);
    await db.end();
    return res.json(rows);
  } catch (err) {
    console.error('❌ Error:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;