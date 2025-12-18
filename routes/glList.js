var express = require('express');
var router = express.Router();
var db = require('./dbDatabase');   // adjust path if needed

// GET /api/glList?companyID=xxx
router.get("/", async function (req, res) {
  try {
    const { companyID } = req.query;
    if (!companyID) {
      return res.status(400).json({ error: "Missing companyID" });
    }

    const sql = "SELECT * FROM glAccount WHERE companyID = ? ORDER BY glNo";
    const [results] = await db.query(sql, [companyID]);

    console.log("✅ General Ledger fetched successfully");
    res.json(results);
  } catch (err) {
    console.error("❌ GL List DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
