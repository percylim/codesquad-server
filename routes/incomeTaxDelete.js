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
           //  var taxID = req.body.taxID;
           //   console.log(taxID);
              var db = mysql.createConnection({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              timezone : "+00:00",
            });  // ale/  var userLevel = req.query.userLevel;
 
              var sql="DELETE from incomeTax where companyID = '"+companyID+"'" ;
                // console.log(req.beforeDestroy() {
               console.log(sql);
                // },);
              db.query(sql, function (err, results, fields) {
               if(err){
                 console.log('Error while deleting Income Tax Record, err');
                return res.send("fail");
               }else{
 
 
                 console.log('Income Tax Record delete successfully');
                return res.send("Success");
                 //results(null,res);
              }
           //   db.end();
           })
           }); 

 module.exports = router;          