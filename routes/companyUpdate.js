var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
//var db = require('./dbDatabase');
// var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
//var db;

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

    var companyID = req.body.companyID;
    var companyName = req.body.companyName;
    var registerNo = req.body.registerNo;
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    var postcode = req.body.postcode;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var incomeTaxNo = req.body.incomeTaxNo;
    var epfNo = req.body.epfNo;
    var socsoNo = req.body.socsoNo;
    var gstNo = req.body.gstNo;
    var telNo1 = req.body.telNo1;
    var telNo2 = req.body.telNo2;
    var faxNo = req.body.faxNo;
    var email = req.body.email;
    var website = req.body.website;
    var finYearStart = req.body.finYearStart;
    var finYearEnd = req.body.finYearEnd;
    var companyLogo = req.body.companyLogo;
    var bankAccount = req.body.bankAccount;
    var businessCode = req.body.businessCode;
   //  console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
    var dbquery = "SElECT * FROM company WHERE companyID="+"'"+ req.body.companyID+ "'";
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

                 dbquery = "SElECT * FROM company WHERE companyID="+"'"+ companyID+ "'";
                  con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length>0) {
                     console.log("Company Account already existed, process update");
                    // return res.status(404).json({ error: "Company Account existed" });
dbquery="UPDATE company SET registerNo = '"+registerNo+"', address1 = '"+address1+"', address2 = '"+address2+"', postcode='"+postcode+"', city='"+city+"', state='"+state+"', country='"+country+"', businessCode='"+businessCode+"', incomeTaxNo='"+incomeTaxNo+"', epfNo='"+epfNo+"', socsoNo='"+socsoNo+"', gstNo='"+gstNo+"', telNo1='"+telNo1+"', telNo2='"+telNo2+"', faxNo='"+faxNo+"', email='"+email+"', website='"+website+"', finYearStart='"+finYearStart+"', finYearEnd='"+finYearEnd+"', companyLogo='"+companyLogo+"', bankAccount='"+bankAccount+"' WHERE companyID='"+companyID+"'"

                  } else {   // create new data

                      dbquery="INSERT INTO company (companyID, companyName, registerNo, address1, address2, postcode, city, state, country, incomeTaxNo, epfNo, socsoNo, gstNo, telNo1, telNo2, faxNo, email, website, finYearStart, finYearEnd, companyLogo, date_created) VALUES('" + companyID + "','"+ companyName +"','"+ registerNo +"','"+ address1+ "','"+ address2+ "','"+ postcode+ "','"+ city+ "','"+ state+ "', '"+ country+ "', '"+ incomeTaxNo+ "', '"+ epfNo+ "', '"+ socsoNo+ "', '"+gstNo+ "', '"+ telNo1+ "', '"+ telNo2+ "', '"+ faxNo+ "', '"+ email+ "','"+ website+ "','"+ finYearStart + "', '"+ finYearEnd+ "', '"+companyLogo+"' CURDATE() )" ;
                  }

                      console.log(dbquery);
                      con.query(dbquery, function (err, result) {
                      if (err) {
                      //console.log(err.message);
                      console.log(err);
                     // res.sendStatus(500);
                     // return;
                      } else {
                       console.log("Company Profile created");
                      }
                      });



                  };
              //    con.end();
                });




          // con.end();
});



module.exports = router;
