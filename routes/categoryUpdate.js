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
    var categoryID = req.body.categoryID;
    var categoryName = req.body.categoryName;
    var catDescription = req.body.catDescription;


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

          dbquery = "select * from category where companyID='"+ companyID +"' and categoryID='"+ categoryID +"'"
           console.log(dbquery);

           con.query(dbquery, function(err, row) {

                   if (err) {
                     //console.log(err.message);
                     console.log(err);
                    // res.sendStatus(500);
                    // return;
                  } else {
                     if (row.length === 0) {   // 2
                       dbquery = "INSERT INTO category (companyID, categoryID, categoryName, catDescription, date_created ) VALUE('" + companyID + "', '"+ categoryID +"', '"+ categoryName + "', '"+ catDescription +"', CURDATE())"

                        console.log(dbquery);
                           con.query(dbquery, function(err, row) {

                           if (err) {
                             //console.log(err.message);
                             console.log(err);
                             res.send(alert("category update fail"));
                            //res.sendStatus(500);
                            // return;
                            } else {
                             console.log("New Product Category created")
                            }
                           });

                      } else {

                           dbquery = "UPDATE category SET categoryName='"+ categoryName+ "', catDescription='"+ catDescription+ "' WHERE companyID='"+ companyID+ "' and categoryID='"+ categoryID +"'";
                            console.log(dbquery);
                           con.query(dbquery, function(err, row) {

                            if (err) {

                            console.log(err);

                            } else {
                            console.log("New Product categoryList Updated")
                            res.send("Success");
                            }

                           });


                       }

                   }

      //     con.end();
        });

      });

module.exports = router;
