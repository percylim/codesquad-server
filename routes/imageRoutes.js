const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

const allowedOrigins = [
  'http://localhost:3000',
  'https://centralsoft.com.my'
];

// CORS middleware
router.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Preflight success
  }
  next();
});

// DB config
const createDB = async () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: '+00:00',
  });
};

// POST /api/images - Get image list
router.post('/images', async (req, res) => {
  const { companyID } = req.body;
  if (!companyID) return res.status(400).json({ error: 'Missing companyID' });

  try {
    const db = await createDB();
    const [results] = await db.query(
      `SELECT id, imageID, imagePath FROM image WHERE companyID = ? ORDER BY imageID`,
      [companyID]
    );
    await db.end();
    res.json(results);
  } catch (err) {
    console.error('❌ DB error in /api/images:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/fetchImage/:imageID - Serve image file
router.get('/fetchImage/:imageID', (req, res) => {
  const { imageID } = req.params;
  const filePath = path.join(__dirname, '..', 'public', 'uploads', imageID);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`❌ File not found: ${imageID}`);
      return res.status(404).json({ error: 'Image not found' });
    }
    res.sendFile(filePath);
  });
});

module.exports = router;
