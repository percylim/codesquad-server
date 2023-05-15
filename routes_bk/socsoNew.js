var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
//var db;

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

    var companyID = req.body.companyID;

    var startSalary = req.body.startSalary;
    var endSalary = req.body.endSalary;
    var companyRate = req.body.companyRate;
    var employeeRate = req.body.employeeRate;
    var remark = req.body.remark;
   //  console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
    var dbquery = ''
       console.log(dbquery);


    var con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });

    con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          });


           dbquery = "SElECT * FROM socso WHERE companyID='"+ companyID+ "' and startSalary='"+ startSalary +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length>0) {   // 2
                     console.log("SOCSO Rate already existed");
                     res.send(alert("SOCSO Rate already existed, please re-entry"))
                    } else  {   // create new record
  dbquery = "INSERT INTO socso (companyID, startSalary, endSalary, companyRate, employeeRate, remark, sortSalary) VALUE('" + companyID + "', '"+ startSalary +"', '"+ endSalary + "','"+ companyRate +"','"+ employeeRate +"','"+ remark +"','"+ startSalary +"')"

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("socso update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New SOCSO Rate created")
                           }

                       });
                   } // 2
                 }
               });


          // con.end();
});



module.exports = router;
