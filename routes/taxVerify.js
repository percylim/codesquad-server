var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
var moment = require('moment');

router.get("/", function(req, res, next) {
              var companyID = req.query.companyID;
              var taxID = req.query.taxID;
              var db = mysql.createConnection({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,

              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              timezone : "+00:00",
            });  // ale/  var userLevel = req.query.userLevel;
              console.log(taxID);
              // console.log(userLevel);
              //console.log('req.body here -> ', categoryID);
              var sql="SELECT * from purchaseInvoice where companyID = '"+companyID+"' AND taxID = '"+taxID+"'";
                // console.log(req.beforeDestroy() {
               console.log(sql);
                // },);
              db.query(sql, function (err, results, fields) {
               if(err){
                 console.log('Error while verifying Government Tax on Purchase Invoice Record, err');
                // results(null,err);
                return res.send(alert('fail to verify Government Tax on Purchase Invoice record'));
              }else{
                console.log(results);
                  db.end();
                //   res.send(results)
               if (results.length > 0) {
                    return res.send('Existed');
               } else{
                    return res.send('Invalid');
               }



                 //results(null,res);
              }


             

              });
              });

module.exports = router;