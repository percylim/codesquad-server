var express = require('express');
  var router = express.Router();
  var mysql = require('mysql2');
  var moment = require('moment');

router.get('/', (req, res) => {
                      res.setHeader('Cache-Control', 'no-store');  // 👈 prevent browser caching
                    
                      const { companyID, invType, jvInit } = req.query;
                      const likePattern = `${invType}${jvInit}-%`;
                     // const likePattern = '${invType}${jvInit}-%`;
                      const db = mysql.createConnection({
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        timezone : "+00:00",
                      });       
                      const sql = `
                        SELECT documentNo,
                               CAST(SUBSTRING_INDEX(documentNo, '-', -1) AS UNSIGNED) AS docNum
                        FROM invoiceTxn
                        WHERE companyID = ?
                          AND invType = ?
                          AND documentNo LIKE ?
                        ORDER BY docNum DESC
                        LIMIT 1
                      `;
                    
                      db.query(sql, [companyID, invType, likePattern], (err, results) => {
                        if (err) {
                    console.error('❌ Select InvoiceTxn Info DB Error:', err);
                     return res.status(500).json({ error: 'Database error' });
                        }
                        db.end();
                        console.log('Query result:', results);
                        res.json(results[0] || {});
                      });
                    });  

module.exports = router;