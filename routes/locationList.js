var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
var qresult = "";
var msg = "";


router.get("/", function(req, res) {
                        var companyID = req.query.companyID;

                      //  var userLevel = req.query.userLevel;
                        console.log(companyID);
                        var db = mysql.createConnection({
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        timezone : "+00:00",
                      });  // ale/  var userLevel = req.query.userLevel;

                        var sql="SELECT * from stockLocation where companyID = '"+companyID+"' order by locationID";
                          // console.log(req.beforeDestroy() {
                         console.log(sql);
                          // },);
                        db.query(sql, function (err, results, fields) {
                         if(err){
                           console.log('Error while fetching Product Location Record, err');
                          // results(null,err);
                          return res.send(alert('fail to load Product Location record'));
                        }else{

                         db.end();
                           console.log('Product Location fetched successfully');
                          console.log(results);
                               return res.send(results);

                           //results(null,res);
                        }
                         
                        });
                        });
module.exports = router;