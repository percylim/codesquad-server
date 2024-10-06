var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
//var md5 = require('md5');
//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
//var db;

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

    var companyID = req.body.companyID;
    var taxID = req.body.taxID;
    var taxType = req.body.taxType;
    var taxCode = req.body.taxCode;
    var taxDescription = req.body.taxDescription;
    var taxRate = req.body.taxRate;
    var remark = req.body.remark;


//  console.log("Bank Account: "+bankAcctNo);


   //  console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
    var dbquery = ''



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

           dbquery = "SElECT * FROM tax WHERE companyID='"+ companyID+ "' and taxID='"+ taxID +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length>0) {   // 2
                     console.log("Tax already existed");
                     res.send(alert("Tax already existed, please re-entry"))
                    } else  {   // create new record
  dbquery = "INSERT INTO tax (companyID, taxID, taxType, taxCode, taxDescription, taxRate, remark, date_created) VALUE('" + companyID + "', '"+ taxID + "', '"+taxType+"', '"+taxCode+"', '"+taxDescription + "', '"+ taxRate + "', '"+ remark + "', CURDATE())";

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("tax update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New Government Tax created")
                           }

                       });
                   } // 2
                 }
               });


      //     con.end();
});



module.exports = router;
