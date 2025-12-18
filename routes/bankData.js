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
 
 router.post("/", function(req, res, next) {
            var companyID = req.body.companyID;
            var bankID = req.body.bankID;
             // var categoryID = req.body.categoryID;
             console.log(bankID);
             var db = mysql.createConnection({
             host: process.env.DB_HOST,
             user: process.env.DB_USER,
             password: process.env.DB_PASSWORD,
             database: process.env.DB_NAME,
             timezone : "+00:00",
           });
            // ale/  var userLevel = req.query.userLevel;
   //console.log('req.body here -> ', categoryID);
             var sql="SELECT * from bankAcct where companyID = '"+companyID+"' and bankID = '"+bankID+"'";
               // console.log(req.beforeDestroy() {
              console.log(sql);
               // },);
             db.query(sql, function (err, results, fields) {
              if(err){
                 console.error('❌ GL List DB Error:', err);
               return res.status(500).json({ error: 'Database error' });
               // results(null,err);
            }else{
                console.log('Bank fetched successfully');
                //results(null,res);
            }

              console.log(results);
              //console.log('company', results);
              if (results.length>0) {
                console.log(results);
              res.send(results);
            } else {

              res.send(null);
             }
              db.end();
             });
            });

module.exports = router;