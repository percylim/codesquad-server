var express = require('express');
var router = express.Router();  // mysql2/promise pool
var db = require('./dbDatabase');

// POST /api/glSave
router.post("/", async function (req, res) {
  const data = req.body;

  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ error: "Missing G/L data" });
  }

  try {
    for (const row of data) {
      await db.query(
        `INSERT INTO glAccount 
         (companyID, glNo, glSub, glType, glName, glDescription, department)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           glType = VALUES(glType),
           glName = VALUES(glName),
           glDescription = VALUES(glDescription),
           department = VALUES(department)`,
        [
          row.companyID,
          row.glNo,
          row.glSub,
          row.glType,
          row.glName,
          row.glDescription,
          row.department,
        ]
      );
    }

    console.log("✅ G/L Accounts saved or updated successfully");
    return res.status(200).json({ message: "Success" });

  } catch (err) {
    console.error("❌ GL Save DB Error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
