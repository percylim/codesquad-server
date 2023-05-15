var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
var moment = require('moment');

router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {

    var companyID = req.body.companyID;
    var productID = req.body.productID;
    var newOpBalance = req.body.opBalance;


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


           dbquery = "SElECT * FROM product WHERE companyID='"+ companyID+ "' and productID='"+ productID +"'";
           console.log(dbquery);
          con.query(dbquery, function(err, row) {

                  if (err) {
                    //console.log(err.message);
                    console.log(err);
                   // res.sendStatus(500);
                   // return;
                  } else {
                    if (row.length===0) {   // 2
                     console.log("Product invalid");
                     res.send(alert("Product: "+productID+" invalid, please re-entry"))
                    } else  {
    //    console.log(row);

        console.log(typeof row[0].opBalance);
        console.log(typeof newOpBalance);               // create new record

      let NewOpBal= Number(newOpBalance).toFixed(3);

  console.log(newOpBalance);

  dbquery = "UPDATE product SET opBalance='"+NewOpBal+"' where productID='"+ productID +"'";

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("product Opening Balance update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New Product Opening Balance updated")
                            res.send("Success");
                           }

                       });
                   } // 2
                 }
               });


          // con.end();
});



module.exports = router;
