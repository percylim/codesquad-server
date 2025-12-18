 var express = require('express');
 var router = express.Router();
 var alert = require('alert');
 var env = process.env;
 var mysql = require('mysql2');
 //var md5 = require('md5');
 //var db = require('./dbDatabase'); var md5 = require('md5');
 var qresult = "";
 var msg = "";
 var bodyParser = require('body-parser');
 
 router.get("/", function (req, res) {            
             const { companyID, bankID, glNo, glType, glSub } = req.query;

             console.log(companyID + " : " + bankID);
           
             const db = mysql.createConnection({
               host: process.env.DB_HOST,
               user: process.env.DB_USER,
               password: process.env.DB_PASSWORD,
               database: process.env.DB_NAME,
               timezone: "+00:00",
             });
           
             const sql = `
               SELECT * FROM glAccount 
               WHERE companyID = ? 
               AND glNo = ? 
               AND glSub = ? 
               AND glType = ?
             `;
           
             console.log('SQL:', sql);
           
             db.query(sql, [companyID, glNo, glSub, glType], (err, results) => {
               if (err) {
                  console.error('❌ GL List DB Error:', err);
               return res.status(500).json({ error: 'Database error' });
               }
           
               console.log('Bank GL fetched successfully');
               console.log(results);
               res.send(results);
             });
           
             db.end();
           });

module.exports = router;