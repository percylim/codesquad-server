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
    var locationID = req.body.locationID;
    var locationName = req.body.locationName;
    var locationAddress = req.body.locationAddress;
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

          dbquery = "select * from stockLocation where companyID='"+ companyID +"' and locationID='"+ locationID +"'"
           console.log(dbquery);

           con.query(dbquery, function(err, row) {

                   if (err) {
                     //console.log(err.message);
                     console.log(err);
                    // res.sendStatus(500);
                    // return;
                  } else {
                     if (row.length === 0) {   // 2
                       dbquery = "INSERT INTO stockLocation (companyID, locationID, locationName, locationAddress, remark, date_created ) VALUE('" + companyID + "', '"+ locationID +"', '"+ locationName + "', '"+ locationAddress +"', '"+ remark +"', CURDATE())"

                        console.log(dbquery);
                           con.query(dbquery, function(err, row) {

                           if (err) {
                             //console.log(err.message);
                             console.log(err);
                             res.send(alert("product location update fail"));
                            //res.sendStatus(500);
                            // return;
                            } else {
                             console.log("New Product Location created")
                            }
                           });

                      } else {

                           dbquery = "UPDATE stockLocation SET locationName='"+ locationName+ "', locationAddress='"+ locationAddress+ "', remark='"+ remark +"' WHERE companyID='"+ companyID+ "' and locationID='"+ locationID +"'";
                            console.log(dbquery);
                           con.query(dbquery, function(err, row) {

                            if (err) {

                            console.log(err);

                            } else {
                            console.log("New Department Updated")
                            res.send("Success");
                            }

                           });


                       }

                   }

           con.end();
        });

      });

module.exports = router;
