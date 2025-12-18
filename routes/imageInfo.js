const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysql = require('mysql2/promise');

// CORS preflight handler
router.options('/', cors());

// Route: POST /api/imageInfo
router.post("/", cors(), async function (req, res) {
  const { companyID } = req.body;

  if (!companyID) {
    return res.status(400).json({ error: "Missing companyID" });
  }

  console.log("📸 Fetching image list for company:", companyID);

  let db;
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "+00:00",
    });

    const sql = `
      SELECT id, imageID, imagePath
      FROM image
      WHERE companyID = ?
      ORDER BY imageID
    `;

    const [results] = await db.query(sql, [companyID]);

    console.log("✅ Image list fetched successfully:", results.length, "records");
    res.json(results);

  } catch (err) {
    console.error("❌ Error while fetching image records:", err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (db) await db.end();
  }
});

module.exports = router;
