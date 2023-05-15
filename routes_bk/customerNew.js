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
    var companyName = req.body.companyName;
    var supplierID = req.body.supplierID;
    var supplierName = req.body.supplierName;
    var acctType = req.body.acctType;
    var tel1 = req.body.tel1;
    var tel2 = req.body.tel2;
    var handPhone = req.body.handPhone;
    var fax = req.body.fax;
    var email = req.body.email;
    var website = req.body.website
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    var city = req.body.city;
    var postcode = req.body.postcode;
    var state = req.body.state;
    var country = req.body.country;
    var paymentTerm = req.body.paymentTerm;
    var creditLimit = req.body.creditLimit;
    var personContact = req.body.personContact;
    var glNo = req.body.glNo;
    var glSub = req.body.glSub;
    var glType = req.body.glType;

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

           dbquery = "SElECT * FROM suppCustAcct WHERE companyID='"+ companyID+ "' and supplierID='"+ supplierID +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   //    Status(500);
                   // return;
                  } else {
                    if (row.length>0) {   // 2
                     console.log("Supplier / Customer profile already existed");
                     res.send(alert("Supplier / Customer profile already existed, please re-entry"))
                    } else  {   // create new record
  dbquery = "INSERT INTO suppCustAcct (companyID, supplierID, supplierName, acctType, tel1, tel2, handPhone, fax, email, website, address1, address2, city, postCode, state, country, paymentTerm, creditLimit, personContact, date_created, glNo, glSub, glType) VALUE('" + companyID + "', '"+ supplierID + "', '"+ supplierName + "', '"+ acctType + "', '"+ tel1 +"', '"+ tel2 + "', '" + handPhone +"', '"+ fax +"', '"+ email + "', '"+ website+"', '"+ address1 + "', '"+ address2 + "', '"+ city + "', '"+ postcode +"', '"+ state + "', '"+ country +"', '"+ paymentTerm + "', '"+ creditLimit +"', '"+ personContact +"', CURDATE(), '"+ glNo +"', '"+ glSub +"', '"+ glType +"')"

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("supplier/customer update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New SUpplier / Customer created")
                           }

                       });
                   } // 2
                 }
               });


          // con.end();
});



module.exports = router;
