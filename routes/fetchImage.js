 const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

router.get('/:file', (req, res) => {
  const imageID = path.basename(req.params.file);
  const filePath = path.join(__dirname, '..', 'public', 'uploads', imageID);
  const origin = req.headers.origin;

  console.log("📸 File Request:", imageID);
  console.log("📁 Full Path:", filePath);
  console.log("🌍 Origin:", origin);

  fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error("❌ File not found:", filePath);
    return res.status(404).send("Image not found");
  }

  // Set correct MIME type
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
  }[ext] || 'application/octet-stream';
  res.setHeader('Content-Type', mimeType);

  // ✅ Allow CORS for image access
  res.setHeader('Access-Control-Allow-Origin', '*');
//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // or your real frontend domain
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("❌ Error sending file:", err);
      res.status(500).send("Error sending image");
    } else {
      console.log("✅ Sent:", filePath);
    }
  });
});
});
module.exports = router;
