var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');

//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var moment = require('moment');

var bodyParser = require('body-parser');

router.get("/", function(req, res, next) {
                var companyID = req.query.companyID;
                 var voucherNo  = req.query.voucherNo;

                console.log(companyID);
                var db = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                timezone : "+00:00",
              });  // ale/  var userLevel = req.query.userLevel;

                var sql="SELECT * FROM journal WHERE companyID = '"+companyID+"' and voucherNo = '"+voucherNo+"'";
                  // console.log(req.beforeDestroy() {
                 console.log(sql);
                  // },);
                db.query(sql, function (err, results, fields) {
                 if(err){
          console.error('❌ journal verify DB Error:', err);
              return res.status(500).json({ error: 'Database error' })
                 }else{


                        console.log(results);
                       if (results.length >0) {


                      res.send("Existed");
                    } else {
                      res.send("Invalid");
                    }// if no record return null array
                     db.end();
                   //results(null,res);
                   }


               


                });
                });

module.exports = router;