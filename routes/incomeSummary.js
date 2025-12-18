var express = require('express');
 var router = express.Router();
 var alert = require('alert');
 var env = process.env;
 var mysql = require('mysql2');

router.post("/", function(req, res, next) {
      var companyID = req.body.companyID;
      var year = req.body.year;
      var startDate = req.body.startDate;
      var endDate = req.body.endDate;
      var beforeTax = req.body.beforeTax;
      var tax = req.body.tax ;
      var afterTax = req.body.afterTax;
     // console.log(employeeNo);
      var db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });  // ale/  var userLevel = req.query.userLevel;

      var sql="INSERT INTO incomeSummary (companyID, year, startDate, endDate, beforeTax, tax, afterTax, date_created) VALUE('" + companyID + "', '"+ year + "', '"+startDate+"', '"+endDate+"', '"+ beforeTax+ "', '"+ tax + "', '"+ afterTax + "', CURDATE())";
        // console.log(req.beforeDestroy() {
       console.log(sql);
        // },);
      db.query(sql, function (err, results, fields) {
       if(err){
         console.log('Error while Insert Record, err');
      return;
       }else{


         console.log('Income Summary successfully inserted');
        return res.send("Success");
         //results(null,res);
      }

     // db.end();
   })

   });

module.exports = router;