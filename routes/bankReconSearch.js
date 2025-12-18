var express = require('express');
       var router = express.Router();
       var alert = require('alert');
       var env = process.env;
       var mysql = require('mysql2');
       
       //var db = require('./dbDatabase'); var md5 = require('md5');
       var qresult = "";
       var msg = "";
       var moment = require('moment'); 
 
    router.get("/", function(req, res, next) {
             var companyID = req.query.companyID;
             var bankID= req.query.bankID;
             var txnDate = req.query.txnDate;
             var db = mysql.createConnection({
               host: process.env.DB_HOST,
               user: process.env.DB_USER,
               password: process.env.DB_PASSWORD,
               database: process.env.DB_NAME,
               timezone : "+00:00",
               connectionLimit: 100,
             });  // alert(c
           //  var userLevel = req.query.userLevel;
             console.log(companyID);
 
             var sql="SELECT * from bankRecon where companyID = '"+companyID+"' and bankID='"+bankID+"' and txnDate = '"+txnDate+"'";
               // console.log(req.beforeDestroy() {
              console.log(sql);
               // },);
             db.query(sql, function (err, results, fields) {
              if(err){
                  console.error('❌ GL Update DB Error:', err);
              return res.status(500).json({ error: 'Journal Voucher load error' })
             }else{
 
                console.log('Bank Reconciliation fetched successfully');
                 console.log(results);
                    res.send(results);
 
                //results(null,res);
             }
 
              db.end();
 
 
             });
             });

module.exports = router;