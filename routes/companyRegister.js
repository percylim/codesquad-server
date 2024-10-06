var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
//var db = require('./dbDatabase');
var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
var db;

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

    var companyID = req.body.companyID;
    var companyName = req.body.companyName;
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    var postcode = req.body.postcode;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var databaseName = req.body.companyID;
    var adminID = req.body.adminID;
    var adminName = req.body.adminName;
    var email = req.body.email;
    var phone = req.body.phone;
    var md5Password = md5(req.body.password+req.body.adminName+req.body.companyID);
   //  console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
    var dbquery = "SElECT * FROM companyCTRL WHERE companyName="+"'"+ req.body.companyName+ "' AND companyID="+"'"+ req.body.companyID+ "'";
       console.log(dbquery);
    var con = mysql.createConnection({
        'host': env.DB_HOST,
        user: 'centralsoft',
        password: 'F7eTo+zZ1c!9b*6e',
        database: 'codesquaddb',
        timezone : "+00:00",
    });
  //  host: process.env.DB_HOST,
//    user: 'centralsoft',
//    password: 'F7eTo+zZ1c!9b*6e',
//    database: 'codesquaddb',
//    timezone : "+00:00",
    con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
        });



                  // ready to create new database and table
                  // AAAA

                  // check admin
              // insert into codesquaddb companyCTRL if not existed

                 dbquery = "SElECT * FROM companyCTRL WHERE companyID="+"'"+ companyID+ "'";
                  con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length>0) {
                     res.send(alert("Company Account already existed"));
                    // return res.status(404).json({ error: "Company Account existed" });

                    } else {   // insert new data

                      dbquery="INSERT INTO companyCTRL (companyID, companyName, address1, address2, postcode, city, state, country, email, phone, databaseName, date_created) VALUES('" + companyID + "','"+ companyName +"','"+ address1+ "','"+ address2+ "','"+ postcode+ "','"+ city+ "','"+ state+ "', '"+ country+ "','"+ email+ "','"+ phone+ "','"+ databaseName + "', CURDATE() )" ;
                   //   console.log(dbquery);
                      con.query(dbquery, function (err, result) {
                      if (err) {
                      //console.log(err.message);
                      console.log(err);
                     // res.sendStatus(500);
                     // return;
                      } else {
                       console.log("company CTRL created");
                      }
                      });


                    }
                  };
                });

                dbquery = "SElECT * FROM admin WHERE companyID="+"'"+ companyID+ "' AND adminID="+"'"+adminID+ "'";
                con.query(dbquery, function(err, row) {

               if (err) {
                     console.log(err);
                    //  res.sendStatus(500);
                    //  return;

               } else {
                   if (row.length>0) {
                    alert("Admin ID already existed");
                   // return res.status(404).json({ error: "Admin ID existed" });

                } else {   // insert new admin

                   // insert into codesauaddb admin database
                  dbquery="INSERT INTO admin (companyID, adminID, adminName, email, phone, password, companyName, date_create) VALUES('" + companyID + "','"+ adminID + "', '"+ adminName +"','"+ email + "', '"+ phone +"', '"+ md5Password+ "', '"+ companyName +"', CURDATE() )" ;
                  console.log(dbquery);
                  con.query(dbquery, function (err, result) {
                    if (err) {
                      console.log(err);
                      //res.sendStatus(500);
                      //return;

                     } else {
                       console.log("Admin created");
                     }
                   });

                }
              };






        //   con.end();
});
});


module.exports = router;
