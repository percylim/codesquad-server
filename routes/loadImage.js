const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Add CORS middleware for all routes
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Handle preflight requests
router.options("/", (req, res) => {
  res.sendStatus(200);
});

// Route: POST /api/loadImageList
router.post("/", async (req, res) => {
  const { companyID } = req.body;

  if (!companyID) {
    return res.status(400).json({ error: "Missing companyID" });
  }

  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "+00:00",
    });

    const [results] = await db.query(
      `SELECT id, imageID, imagePath FROM image WHERE companyID = ? ORDER BY imageID`,
      [companyID]
    );

    await db.end();

    res.json(results);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database operation failed" });
  }
});
module.exports = router;
