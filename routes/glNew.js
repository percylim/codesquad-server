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
    var glNo = req.body.glNo;
    var glSub = req.body.glSub;
    var glType = req.body.glType;
    var glName = req.body.glName;
    var glDescription = req.body.glDescription;
    var department = req.body.department;
    var opBalance = req.body.opBalance;
    var glNo = req.body.glNo;
    var glSub = req.body.glSub;
    var department = req.body.department;
    var glName = req.body.glName;
    var glType = req.body.glType;
    console.log("G/L Account: "+glNo);


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

if (glType === '804') {

  dbquery = "SElECT * FROM glAccount WHERE companyID='"+ companyID+ "' and glType='"+ glType+ "'";
  console.log(dbquery);
 con.query(dbquery, function(err, row) {

         if (err) {
           //console.log(err.message);
           console.log(err);
          // res.sendStatus(500);
          // return;
         } else {
           if (row.length>0) {
             con.end();
            return(alert('Opening Balance allow only one G/L Account'))
          }
        }     // 2



});
}



           dbquery = "SElECT * FROM glAccount WHERE companyID='"+ companyID+ "' and glNo='"+ glNo +"' and glSub='"+ glSub +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length>0) {   // 2
                     console.log("General Ledger Account already existed");
                     res.send(alert("General Ledger Account already existed, please re-entry"))
                    } else  {   // create new record
  dbquery = "INSERT INTO glAccount (companyID, glNo, glSub, glType, department, glName, glDescription, glAmount) VALUE('" + companyID + "', '"+ glNo + "', '"+ glSub + "', '"+ glType + "', '"+ department + "', '"+ glName + "', '"+ glDescription + "', '0.00')"

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("General Ledger update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New G/L Account created")
                           }

                       });
                   } // 2
                 }
               });


      //     con.end();
});



module.exports = router;
