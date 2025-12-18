var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
var md5 = require('md5');
//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
//var db;

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

    var companyID = req.body.companyID;
    var employeeNo = req.body.employeeNo;
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    var md5oldPassword = md5(req.body.oldPassword+req.body.employeeNo+req.body.companyID);
    var md5newPassword = md5(req.body.newPassword+req.body.employeeNo+req.body.companyID);
   //  console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
    var dbquery = ''
    //   console.log(dbquery);
    console.log('Old Password = '+oldPassword);
    console.log('New Password = '+newPassword)

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

// check employee old password is invalid

dbquery = "SElECT * FROM employee WHERE employeeNo='"+ employeeNo+ "' AND companyID='"+ companyID+ "' AND password='"+ md5oldPassword +"'";

console.log(dbquery);
  con.query(dbquery, function(err, row) {
if (err) {

    //alert(result);
   console.log(err.message);

 } else {   // y
     if (row.length<=0) {
      //  console.log(row);
      // res.redirect("/secrets");
       //alert("Login Success");
       res.send(alert("failed due to Old Password invalid"));
     } else {   //w

        dbquery="UPDATE employee SET password = '" +md5newPassword+ "' WHERE companyID = '"+req.body.companyID+"' AND employeeNo = '"+req.body.employeeNo+"' AND password='"+ md5oldPassword + "'"
        console.log(dbquery);
        con.query(dbquery, function(err, row) {

        if (err) {
          //console.log(err.message);
          console.log(err);
          res.send(alert("fail to change employee password"));
         //res.sendStatus(500);
         // return;
         } else {
          console.log("Update employee success")
          res.send('success');
         }
     });


   }; // w
 };  // y
// con.end();
});
});
  // con.end();


module.exports = router;
