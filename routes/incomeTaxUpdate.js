const express = require('express');
const router = express.Router();
const pool = require('./dbDatabase'); // your pooled connection

// GET income tax data
router.get('/', async (req, res) => {
  const companyID = req.query.companyID;
  try {
    const [results] = await pool.query(
      "SELECT * FROM incomeTax WHERE companyID = ? ORDER BY category",
      [companyID]
    );
    console.log("✅ Income Tax fetched successfully");
    res.json(results);
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST save new income tax data
router.post('/', async (req, res) => {
  const data = req.body;
  const todaysDate = new Date();
  const year = todaysDate.getFullYear();

  if (!data || data.length === 0) {
    return res.status(400).send("No data provided");
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (let row of data) {
      const {
        companyID,
        category,
        incomeFrom,
        incomeTo,
        calFirst,
        calNext,
        rate,
        tax
      } = row;

      await conn.query(
        `INSERT INTO incomeTax
         (companyID, category, incomeFrom, incomeTo, calFirst, calNext, rate, tax, year, date_created)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
        [
          companyID,
          category,
          incomeFrom,
          incomeTo,
          calFirst,
          calNext,
          rate,
          tax,
          year
        ]
      );
    }

    await conn.commit();
    console.log("✅ Income Tax rows inserted");
    res.send("Success");
  } catch (err) {
    await conn.rollback();
    console.error("❌ Insert Error:", err);
    res.status(500).send("Database insert failed");
  } finally {
    conn.release();
  }
});

module.exports = router;
