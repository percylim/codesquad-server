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
    var productID = req.body.productID;
    var sku = req.body.sku;
    var barcode = req.body.barcode;
    var productName = req.body.productName;
    var description = req.body.description;
    var unit = req.body.unit;
    var unitPrice = req.body.unitPrice;
    var productImage = req.body.productImage;
    var categoryID = req.body.categoryID;


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
                     console.log("Product Profile not existed");
                     res.send(alert("Product Profile not existed, please re-entry"))
                    } else  {   // create new record
  dbquery = "UPDATE product SET sku='"+ sku +"', barcode='"+ barcode +"', productName='"+ productName +"', description='"+ description +"', unit='"+ unit +"', unitPrice='"+ unitPrice +"', productImage='"+ productImage +"', categoryID='"+ categoryID +"' WHERE companyID='"+ companyID + "' AND productID='"+ productID +"'"

 console.log(dbquery);
                          con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                            res.send(alert("product update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("Product Profile updated")
                            res.send("Success");
                           }
                           con.end();

                       });
                   } // 2
                 }
               });


          // con.end();
});



module.exports = router;
