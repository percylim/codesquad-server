var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var moment = require('moment');


 router.get("/", function(req, res) {
  var companyID = req.query.companyID;
   var startDate = req.query.startDate;
   var endDate = req.query.endDate;
  var txnType = req.query.txnType;

    var db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     timezone : "+00:00",
     });  // alert(c
           //  var userLevel = req.query.userLevel;
       console.log(companyID);
        // console.log(userLevel);
        //console.log('req.body here -> ', categoryID);
    var sql="SELECT * from productTxn where companyID = '"+companyID+"' and txnType='"+txnType+"' and txnDate >= '"+startDate+"' and txnDate <= '"+endDate+"' order by txnDate";
       // console.log(req.beforeDestroy() {
      console.log(sql);
         // },);
     db.query(sql, function (err, results, fields) {
       if(err){
         console.log('Error while fetching Product Txn. Search, err');
       // results(null,err);
       return res.send(alert('fail to load Product Txn. search'));
      }else{
             console.log('Product Txn. search successfully');
       console.log(results);
      return res.send(results);
    //results(null,res);
     }
   });
   });



module.exports = router;