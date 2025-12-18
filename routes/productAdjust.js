var express = require('express');
 var router = express.Router();
 var alert = require('alert');
 var env = process.env;
 var mysql = require('mysql2');
          
          //var db = require('./dbDatabase'); var md5 = require('md5');
 var qresult = "";
 var msg = "";
 var moment = require('moment'); 

router.post("/", function(req, res, next) {
    var data = req.body;
console.log(data);
    var companyID = data.companyID;
    var productID = data.productID;
    var productName = data.productName;
    var sku = data.sku;
    var barcode = data.barcode;
    var unit = data.unit;
    var unitPrice = data.unitPrice;
    var adjQty = data.adjQty;
    var txnDate = data.txnDate;
    var txnParticular = data.txnParticular;
    var txnType = 'ADJUSTMENT';
    var txnQtyIn = 0;
    var txnQtyOut =0;
    if ((typeof adjQty) === 'string') {
        adjQty=Number(adjQty);
    }
console.log(adjQty);
    if (adjQty <0 ){
       txnQtyOut = adjQty * -1;
     }
     if (adjQty >0 ) {
        txnQtyIn = adjQty;
     }
    var db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone : "+00:00",
    });  // alert(c   // var categoryID = req.body.categoryID;


    dbquery = "INSERT INTO productTxn (companyID, productID, sku, barcode, productName, unit, unitPrice, txnType, txnQtyIn, txnQtyOut, txnDate, txnParticular, date_created) VALUE('" + companyID + "', '"+ productID+"', '"+sku+"', '"+barcode+"', '"+productName+"', '"+unit+"', '"+unitPrice+"', '"+txnType+"', '"+txnQtyIn+"', '"+txnQtyOut+"', '"+txnDate+"', '"+txnParticular+"', CURDATE())"

    console.log(dbquery);
        db.query(dbquery, function(err, row) {

                            if (err) {
                              //console.log(err.message);
                              console.log(err);
                            //  res.send(alert(err+" occured in input data, update fail"));
                             return res.sendStatus(500);
                             // return;
                             } else {
                               db.end()
                              console.log("New Adjustment ProductTxn created")
                              return res.send('success');
                             }

          });
        });
module.exports = router;