 var express = require('express');
       var router = express.Router();
       var alert = require('alert');
       var env = process.env;
       var mysql = require('mysql2');
       
       //var db = require('./dbDatabase'); var md5 = require('md5');
       var qresult = "";
       var msg = "";
       var moment = require('moment');
       


router.post("/", function(req, res, next) {
   var companyID = req.body.companyID;
   var bankID = req.body.bankID;
   var txnDate = req.body.txnDate;

   var db = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   timezone : "+00:00",
 });  // ale/  var userLevel = req.query.userLevel;

 var sql="DELETE from bankRecon where companyID = '"+companyID+"' AND bankID='"+ bankID +"' AND txnDate='"+txnDate+"'" ;
   // console.log(req.beforeDestroy() {
  console.log(sql);
   // },);
 db.query(sql, function (err, results, fields) {
  if(err){
     console.error('❌ GL Update DB Error:', err);
              return res.status(500).json({ error: 'Journal Voucher load error' })
  }else{


    console.log('Bank Reconciliation Record delete successfully');
    console.log(results.affectedRows);
   res.send("Success");
    //results(null,res);
 }
   db.end();
});
});

module.exports = router;