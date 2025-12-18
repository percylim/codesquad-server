var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');

router.post("/", function(req, res) {
     var companyID = req.body.companyID;
     var year = req.body.year;
    // console.log(employeeNo);
     var db = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     timezone : "+00:00",
   });  // ale/  var userLevel = req.query.userLevel;

     var sql="DELETE from trialBalance where companyID = '"+companyID+"' AND year='"+ year +"'" ;
       // console.log(req.beforeDestroy() {
      console.log(sql);
       // },);
     db.query(sql, function (err, results, fields) {
      if(err){
        console.log('Error while delete trial Balance Record, err');
        return(alert("fail delete Trial Balance"));
      }else{
                   
        console.log('Trial Balance successfully deleted');
        return res.send("Success");
        //results(null,res);
     }
     
  })
  });

module.exports = router;