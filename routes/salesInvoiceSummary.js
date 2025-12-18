var express = require('express');
  var router = express.Router();
  var mysql = require('mysql2');
  var moment = require('moment');

router.get("/", function(req, res) {
                         var companyID = req.query.companyID;
                         var supplierID = req.query.supplierID;
                         var invoiceNo = req.query.invoiceNo;
 
                         console.log(companyID);
                         var db = mysql.createConnection({
                         host: process.env.DB_HOST,
                         user: process.env.DB_USER,
                         password: process.env.DB_PASSWORD,
                         database: process.env.DB_NAME,
                         timezone : "+00:00",
                       });  // ale/  var userLevel = req.query.userLevel;
 
                         var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and suppCustID = '"+supplierID+"' and invoiceNo = '"+invoiceNo+"' and pur_sal = 'S' ";
                           // console.log(req.beforeDestroy() {
                          console.log(sql);
                           // },);
                         db.query(sql, function (err, results, fields) {
                          if(err){
                     console.error('❌ Select InvoiceTxn Info DB Error:', err);
                     return res.status(500).json({ error: 'Database error' });
                          }
 
                   db.end();
                   console.log(results);
                    res.send(results);
 
 
                         });
                         });
 
module.exports = router;