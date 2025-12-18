var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var moment = require('moment');

router.get("/", function(req, res) {
                      var companyID = req.query.companyID;
                      var supplierID = req.query.supplierID;
                      var pur_sal = req.query.pur_sal;
                      var invType = req.query.invType;
                      var txnDate = req.query.txnDate;
                      var dueDate = req.query.dueDate;

                      console.log(companyID);
                      var db = mysql.createConnection({
                      host: process.env.DB_HOST,
                      user: process.env.DB_USER,
                      password: process.env.DB_PASSWORD,
                      database: process.env.DB_NAME,
                      timezone : "+00:00",
                    });  // ale/  var userLevel = req.query.userLevel;

                      var sql="SELECT * from invoiceTxn where companyID = '"+companyID+"' and suppCustID = '"+supplierID+"' and invType = '"+invType+"' and pur_sal = '"+pur_sal+"' and txnDate>='"+txnDate+"' and txnDate<='"+dueDate+"'";
                        // console.log(req.beforeDestroy() {
                       console.log(sql);
                        // },);
                      db.query(sql, function (err, results, fields) {
                         db.end();
                        if(err){
                         console.error('❌ Company Info DB Error:', err);
                         return res.status(500).json({ error: 'Database error' });
                       }
                              console.log(results);
                            res.send(results);

                      });
                      });

module.exports = router;