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
    var companyName = req.body.companyName;
    var employeeNo = req.body.employeeNo;
    var employeeName = req.body.employeeName;
    var nric = req.body.nric;
    var sex = req.body.sex;
    var dateBirth = req.body.dateBirth;
    var race = req.body.race;
    var maritalStatus = req.body.maritalStatus;
    var childs = req.body.childs;
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    var city = req.body.city;
    var state = req.body.state;
    var postcode = req.body.postcode;
    var country = req.body.country;
    var level = req.body.level;
    var position = req.body.position;
    var salary = req.body.salary;
    var payMethod = req.body.payMethod;
    var incomeTaxNo = req.body.incomeTaxNo;
    var epfNo = req.body.epfNo;
    var socsoNo = req.body.socsoNo;
    var drivingLicenseNo = req.body.drivingLicenseNo;
    var telNo = req.body.telNo;
    var hpNo = req.body.hpNo;
    var email = req.body.email;
    var employDate = req.body.employDate;
    var password = req.body.password;
    var md5Password = md5(req.body.password+req.body.employeeNo+req.body.companyID);
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



                  // ready to create new database and table
                  // AAAA

                  // check admin
              // insert into codesquaddb companyCTRL if not existed


  dbquery = "UPDATE employee SET employeeName='"+ employeeName + "',  nric= '"+ nric + "', sex= '"+ sex + "', dateBirth='"+ dateBirth + "', race='"+ race + "', maritalStatus='"+ maritalStatus + "', childs='"+ childs + "', address1='"+ address1 + "', address2='"+ address2 + "', city='"+ city + "', state='"+ state + "', postCode='"+ postcode+ "', country='"+ country + "', level='"+ level + "', position='"+ position + "', salary='"+ salary + "', payMethod='"+ payMethod + "', incomeTaxNo='"+ incomeTaxNo + "', epfNo='"+ epfNo + "', socsoNo='"+ socsoNo + "', drivingLicenseNo='"+ drivingLicenseNo + "', telNo='"+ telNo + "', hpNo='"+ hpNo + "', email='"+ email + "', employDate='"+ employDate + "', companyName='"+ companyName +"', password = '"+md5Password+"' WHERE companyID = '"+companyID+"' and employeeNo = '"+employeeNo+"'"

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("employee update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("Update employee success")
                             res.send('success');
                           }

                       });




        //   con.end();
});



module.exports = router;
