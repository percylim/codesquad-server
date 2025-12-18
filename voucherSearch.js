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


router.get("/", function(req, res) {
          var companyID = req.query.companyID;
          var startDate = req.query.startDate;
          var endDate = req.query.endDate;

          console.log(companyID);
          console.log(startDate);
          console.log(endDate);
          var db = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          timezone : "+00:00",
        });  // ale/  var userLevel = req.query.userLevel;

          var sql="SELECT * from journal where companyID = '"+companyID+"' and txnDate>='"+startDate+"' and txnDate<='"+ endDate +"' order by txnDate, voucherNo ASC";
        //  var sql="SELECT * from journal where companyID = '"+companyID+"' order by txnDate ASC";
            // console.log(req.beforeDestroy() {
           console.log(sql);
            // },);
          db.query(sql, function (err, results, fields) {
           if(err){
      console.error('❌ GL Update DB Error:', err);
              return res.status(500).json({ error: 'Database error' })
           }else{
                db.end();
               if (results.length>0) {
                  console.log(results);
                return res.send(results);
                } else {

                return res.send(alert('No records between '+startDate+' and '+endDate));
                }


             //results(null,res);
             }


         // db.end();


          });
          });
module.exports = router;
