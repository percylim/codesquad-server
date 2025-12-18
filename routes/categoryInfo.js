  const express = require('express');
   const router = express.Router();
   const mysql = require('mysql2/promise');
   const moment = require('moment');
 
 router.post("/", async function(req, res) {
  try {
       const db = await mysql.createConnection({
         host: process.env.DB_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
         timezone: "+00:00",
       });
 const companyID = req.body.companyID || req.query.companyID;
    if (!companyID) {
      return res.status(400).json({ error: 'companyID is required' });
    }
 const sql = `
      SELECT id, categoryID, categoryName FROM category WHERE companyID = ? ORDER BY categoryID
    `;

  const [result] = await db.query(sql, [companyID]); 

    await db.end();
    res.json(result || []);
 } catch (err) {
    console.error('❌ Error during category Listing:', err);
    res.status(500).json({ error: err.message });
  }
  
});


  module.exports = router;
          