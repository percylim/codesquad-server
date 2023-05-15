var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');


router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

    var companyID = req.body.companyID;
    var glNo = req.body.glNo;
    var glSub = req.body.glSub;
    var NewOpBalance = req.body.opBalance;
    console.log("G/L Account: "+glNo+" - "+glSub);

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


           dbquery = "SElECT * FROM glAccount WHERE companyID='"+ companyID+ "' and glNo='"+ glNo +"' and glSub='"+ glSub +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length===0) {   // 2
                     console.log("General Ledger Account invalid");
                     res.send(alert("General Ledger Account invalid, please re-entry"))
                    } else  {   // create new record
      let nAmount = dbquery.glAmount+(NewOpBalance-dbquery.opBalance);
      let NewAmount=nAmount.replace(/,(?=.*\.\d+)/g, '');
      let NewOpBal= NewOpBalance.replace(/,(?=.*\.\d+)/g, '');




  dbquery = "UPDATE glAccount SET glAmount='"+NewAmount+"'', opBalance='"+NewOpBal+"' where glNo='"+ glNo +"' and glSub='"+ glSub +"'";

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("general ledger update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New G/L Account created")
                            res.send("Success");
                           }

                       });
                   } // 2
                 }
               });


          // con.end();
});



module.exports = router;
