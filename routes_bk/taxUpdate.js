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
    var taxID = req.body.taxID;
    var taxDescription = req.body.taxDescription;
    var taxRate = req.body.taxRate;
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


           dbquery = "UPDATE tax SET taxDescription='"+ taxDescription+ "', taxRate='"+ taxRate +"', remark='"+ remark +"' WHERE companyID='"+ companyID+ "' and taxID='"+ taxID +"'";
           console.log(dbquery);
           con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {

                            console.log("New Tax Updated")
                            res.send("Success");
                           }

                });


          // con.end();
});



module.exports = router;
