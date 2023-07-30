var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
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
    var bankID = req.body.bankID;
    var bankName = req.body.bankName;
    var bankAcctNo = req.body.bankAcctNo;
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    var city = req.body.city;
    var postcode = req.body.postcode;
    var state = req.body.state;
    var country = req.body.country;
    var tel1 = req.body.tel1;
    var tel2 = req.body.tel2;
    var fax = req.body.fax;
    var email = req.body.email;
    var glNo = req.body.glNo;
    var glSub = req.body.glSub;
    var department = req.body.department;
    var glName = req.body.glName;
    var glType = req.body.glType;
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

           dbquery = "SElECT * FROM bankAcct WHERE companyID='"+ companyID+ "' and bankID='"+ bankID +"' and bankAcctNo='"+ bankAcctNo +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length>0) {   // 2
                     console.log("Bank Account already existed");
                     res.send(alert("Bank Account already existed, please re-entry"))
                    } else  {   // create new record
  dbquery = "INSERT INTO bankAcct (companyID, bankID, bankName, bankAcctNo, address1, address2, postcode, city, state, country, tel1, tel2, fax, email, date_created, glNo, glSub, glType) VALUE('" + companyID + "', '"+ bankID + "', '"+ bankName + "', '"+ bankAcctNo + "', '"+ address1 + "', '"+ address2 + "', '"+ postcode + "', '"+ city +"', '"+ state + "', '"+ country +"', '"+ tel1 + "', '"+ tel2 +"', '"+ fax +"', '"+ email +"', CURDATE(), '"+ glNo +"', '"+ glSub +"', '"+ glType +"')"

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("bank update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New Bank Account created")
                           }

                       });
                   } // 2
                 }
            //     con.end();
               });


          // con.end();
});



module.exports = router;
