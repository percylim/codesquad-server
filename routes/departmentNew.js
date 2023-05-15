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
    var department = req.body.department;
    var description = req.body.description;

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


           dbquery = "SElECT * FROM department WHERE companyID='"+ companyID+ "' and department='"+ department +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length>0) {   // 2
                     console.log("Department profile already existed");
                     res.send(alert("Department profile already existed, please re-entry"))
                    } else  {   // create new record
  dbquery = "INSERT INTO department (companyID, department, Description, dateCreated ) VALUE('" + companyID + "', '"+ department +"', '"+ description + "',  CURDATE())"

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("department update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New Department created")
                           }

                       });
                   } // 2
                 }
               });


          // con.end();
});



module.exports = router;
