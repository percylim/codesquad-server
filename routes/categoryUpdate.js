const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

router.post('/', async function (req, res) {
  const { companyID, categoryID, categoryName, catDescription } = req.body;

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "+00:00",
  });

  try {
    await db.beginTransaction();
    console.log("🔄 Starting Category Update");

    const [result] = await db.query(
      "SELECT * FROM category WHERE companyID = ? AND categoryID = ?",
      [companyID, categoryID]
    );

    if (result.length > 0) {
      console.log("⚠️ Category already exists. Proceeding with update...");

      const updateQuery = `
        UPDATE category
        SET categoryName = ?, catDescription = ?
        WHERE companyID = ? AND categoryID = ?
      `;
      const updateValues = [categoryName, catDescription, companyID, categoryID];

      await db.query(updateQuery, updateValues);
      console.log("✅ Category updated successfully");
    } else {
      console.log("🆕 Category does not exist. Proceeding with insert...");

      await db.query(
        `INSERT INTO category (companyID, categoryID, categoryName, catDescription)
         VALUES (?, ?, ?, ?)`,
        [companyID, categoryID, categoryName, catDescription]
      );

      console.log("✅ Category inserted successfully");
    }

    await db.commit();
    res.send("Success");

  } catch (err) {
    await db.rollback();
    console.error('❌ Error during category update:', err);
    res.status(500).json({ error: err.message });
  } finally {
    await db.end();
  }
});

module.exports = router;
