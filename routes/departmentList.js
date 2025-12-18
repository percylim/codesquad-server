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
//var db;


router.get("/", function(req, res) {
    var companyID = req.query.companyID;

    console.log(companyID);
    var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone : "+00:00",
  });  // ale/  var userLevel = req.query.userLevel;

    var sql="SELECT * from department where companyID = '"+companyID+"' order by department";
      // console.log(req.beforeDestroy() {
     console.log(sql);
      // },);
    db.query(sql, function (err, results, fields) {
     if(err){
       console.log('Error while fetching Department Record, err');
      // results(null,err);
      res.send(alert('fail to load Department data'));
    }else{


       console.log('Department fetched successfully');
      console.log(results);
           res.send(results);

       //results(null,res);
    }

    db.end();


    });
    });

module.exports = router;     