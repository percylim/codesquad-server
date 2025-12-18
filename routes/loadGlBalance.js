var express = require('express');
 var router = express.Router();
 var alert = require('alert');
 var env = process.env;
 var mysql = require('mysql2');
 //var format = require("date-fns");
 //var db = require('./dbDatabase'); var md5 = require('md5');
 var qresult = "";
 var msg = "";
 var jvData
 var bodyParser = require('body-parser');
 


router.get("/", function(req, res) {
                              var companyID = req.query.companyID;
                              var txnDate = req.query.txnDate;
                              var glNo = req.query.glNo;
                              var glSub = req.query.glSub;
                              var opBalance = 0;
                              var curBalance =0;
                              var sumBalance=0;
                              console.log(companyID);
                              console.log(txnDate);

                              var db = mysql.createConnection({
                              host: process.env.DB_HOST,
                              user: process.env.DB_USER,
                              password: process.env.DB_PASSWORD,
                              database: process.env.DB_NAME,
                              timezone : "+00:00",
                            });  // ale/  var userLevel = req.query.userLevel;

                              // *** tsearch glAccount table for
                                var sql ="SELECT * from glAccount where companyID = '"+companyID+"' and glNo = '"+glNo+"' and glSub = '"+glSub+"'";
                                 console.log(sql);
                                 db.query(sql, function (err, results, fields) {
                                  if(err){
                              console.error('❌ GL Update DB Error:', err);
                   return res.status(500).json({ error: 'Database error' });
                                  }else{

                                      if (results.length > 0) {
                                          opBalance = results[0].opBalance;
                                          console.log("O/P Balance = "+opBalance);
                                      } else {
                                       res.send(alert('No records existed with G/L No. '+glNo+' and G/L Sub No.'+glSub));
                                       }
                                  }
                              });

                                // Sum opcrAMt and drAmt in Jourm\nal file ****

                                sql="SELECT SUM(drAmt-crAmt) AS sumBalance FROM journal where companyID='"+companyID+"' and glNo='"+glNo+"' and glSub='"+glSub+"' and txnDate<='"+txnDate+"'";
                                 console.log(sql);

                                 db.query(sql, function (err, results, fields) {
                                  if(err){
                                console.error('❌ GL Update DB Error:', err);
                   return res.status(500).json({ error: 'Database error' });
                                  }else{

                                      if (results.length>0) {
                                          results[0].sumBalance = opBalance+results[0].sumBalance;
                                          sumBalance=results[0].sumBalance;

                                         //  console.log("first Sumbalance: "+sumBalance);
                                       } else {

                                          curBalance = opBalance;
                                          sumBalance = 0;
                                       }
                                         if (sumBalance === null) {
                                             sumBalance =0;
                                         }
                                        // sumBalance = opBalance+sumBalance;
                                        // sun console.log("Type: "+(typeof sumBalance));
                                        // opBalance = curBalance;
                                         console.log("sumBalance: "+sumBalance)
                                         console.log("opBalance: "+opBalance);
                                         console.log(results[0].sumBalance);
                                         res.send(results);
                                    //results(null,res);
                                    }
                                    db.end()
                                });

                              });

module.exports = router;