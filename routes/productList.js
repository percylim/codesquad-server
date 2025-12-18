 const express = require('express');
  const router = express.Router();
  const mysql = require('mysql2/promise');
  const moment = require('moment');

 router.get("/", async function(req, res) {
   var companyID = req.query.companyID;
 
try {
     const db = await mysql.createConnection({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       timezone: "+00:00",
     });


     //  var userLevel = req.query.userLevel;
                             console.log(companyID);
  const sql = `
      SELECT * FROM product WHERE companyID = ? ORDER BY productID
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