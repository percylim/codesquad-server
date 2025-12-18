var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
//var db = require('./dbDatabase');
// var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');

router.get("/", function(req, res, next) {
         var companyID = req.query.companyID;
         var db = mysql.createConnection({
         host: process.env.DB_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
         timezone : "+00:00",
       });  // ale/  var userLevel = req.query.userLevel;
         console.log(companyID);
  
         //console.log('req.body here -> ', categoryID);
         var sql="SELECT * from glAccount where companyID = '"+companyID+"' AND (glType='801' OR glType='802') order by glNo";
           // console.log(req.beforeDestroy() {
          console.log(sql);
           // },);
         db.query(sql, function (err, results, fields) {
          if(err){
            console.log('Error while fetching General Ledger Record, err');
           // results(null,err);
           res.send(alert('fail to load General Ledger data'));
         }else{
 
 
            console.log('Generl Ledger fetched successfully');
           console.log(results);
                res.send(results);
 
            //results(null,res);
         }
 
 
         db.end();
 
         });
         }); 

module.exports = router;   