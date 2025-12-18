var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
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
    var txnType = 'WRITEOFF';
    var txnQtyIn = 0;
    var txnQtyOut =0;
    if ((typeof adjQty) === 'string') {
        adjQty=Number(adjQty);
    }
console.log(adjQty);

    if (adjQty < 0 ){
       txnQtyOut = adjQty * -1;
     } else {
       txnQtyOut = adjQty;
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
                             //res.sendStatus(500);
                             // return;
                             } else {
                              console.log("New WTITE OFF ProductTxn created")
                              res.send('success');
                             }
db.end()
 });
});

module.exports = router;
