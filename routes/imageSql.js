var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
//var db;

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

    var companyID = req.body.companyID;
    var imageID = req.body.imageID;


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

          dbquery = "select * from image where companyID='"+ companyID +"' and imageID='"+ imageID +"'"
           console.log(dbquery);

           con.query(dbquery, function(err, row) {
                   console.log(row);
                   if (err) {
                     //console.log(err.message);
                     console.log(err);
                    // res.sendStatus(500);
                    // return;
                  } else {
                     if (row.length === 0) {   // 2
                       dbquery = "INSERT INTO image (companyID, imageID, imagePath, date_uploaded ) VALUE('" + companyID + "', '"+ imageID +"', '/public/uploads', CURDATE())"

                        console.log(dbquery);
                           con.query(dbquery, function(err, row) {

                           if (err) {
                             //console.log(err.message);
                             console.log(err);
                             res.send(alert(err+" occured in input data, update fail"));
                            //res.sendStatus(500);
                            // return;
                            } else {
                             console.log("New image created")
                            }
                           });

                      }

                   }

          // con.end();
        });

      });

module.exports = router;
