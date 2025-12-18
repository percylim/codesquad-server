  const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // Make sure this exports a mysql2/promise connection

// POST /api/productData
router.post('/', async (req, res) => {
  const { companyID } = req.body;

  if (!companyID) {
    return res.status(400).json({ error: "companyID is required" });
  }

  console.log(`📸 Fetching product list for company: ${companyID}`);

  try {
    const [rows] = await db.query(
      `SELECT * FROM product WHERE companyID = ? ORDER BY productName`,
      [companyID]
    );

    console.log(`✅ Product list fetched successfully: ${rows.length} records`);
    res.json(rows);

  } catch (err) {
    console.error("❌ Error during product listing:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;