var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');


//var db = require('./dbDatabase'); var md5 = require('md5');
var qresult = "";
var msg = "";
var moment = require('moment');

var bodyParser = require('body-parser');
//const date = require('date-and-time')

router.get('/', function(req, res, next) {



});

router.post('/', function(req, res, next) {
  var invData = req.body;
  //console.log('axios post to purhcase Invoice');
  console.log(invData) ;
//   newDatas[i].voucherNo= voucherNo;

var companyID = invData[0].companyID;
var voucherNo = invData[0].voucherNo.toUpperCase();
var supplierID = invData[0].supplierID;
 var supplierName=invData[0].supplierName;
var invoiceNo = '' ;
var txnDate = invData[0].txnDate;
var invType = 'PRN';
var documentNo = invData[0].documentNo;
var jvInit = invData[0].voucherNo.substring(0,4);
var taxID = '' ;
var taxRate = 0 ;
var taxCode = '';
// var txnParticular = ''; returnParticular
var taxType = '';
var taxDescription = '';
var remark = '';
var txnTotal= 0;
var txnAmount = 0;
var taxAmount = 0;
var taxTotal = 0;
var noteTaxTotal = 0;
var netTotal = 0;
var txnTaxTotal = 0;
var txnNetTotal = 0
var drAmt =0;
var crAmt = 0;
var txnType = 'RETURN NOTE';
 var txnParticular = 'Purchase Invoice Goods Return Note';
 var productID = '';
 var productName='';
 var barcode = '';
 var returnQuantity=0;
 var unit = '';
 var unitPrice = 0;
 var sku='';
 var locationID = '';


console.log(invData);
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

// update purchase Invoice


 for (let i = 0; i < invData.length; i++) {




   taxID = invData[i].taxID;
   taxCode = invData[i].taxCode;
   taxRate = invData[i].taxRate;
   taxType = invData[i].taxType;
   remark = invData[i].returnParticular;
   invoiceNo = invData[i].invoiceNo;
   documentNo = invData[i].documentNo;
 //  taxDescription = invData[i].taxDescription;
   txnDescription = invData[i].returnParticular;
   txnAmount = parseFloat(invData[i].itemTotal);
   taxTotal = parseFloat(invData[i].itemTax);
   noteTaxTotal += parseFloat(invData[i].itemTax);
   netTotal = invData[i].itemNetTotal;
   txnTotal+=invData[i].ItemNetTotal;
   txnTaxTotal+=invData[i].itemTax;
   txnNetTotal+=invData[i].itemNetTotal;
   productID = invData[i].productID;
   productName=invData[i].productName;
   barcode = invData[i].barcode;
   returnQuantity=invData[i].returnQuantity;
   unit = invData[i].unit;
   unitPrice = invData[i].unitPrice;




  // add taxTxn
  if (taxType === 'INPUT') {
  dbquery = "INSERT INTO taxTxn (companyID, taxID, taxType, taxCode, taxDescription, remark, itemAmount, taxRate, taxAmount, suppCustID, documentNo, documentType, document_date, date_created) VALUE('" + companyID + "', '"+ taxID + "', '"+ taxType + "', '"+ taxCode + "', '"+ taxDescription + "', '"+remark+"', '"+txnAmount+"', '"+taxRate+"', '"+taxTotal+"', '"+supplierName+"', '"+documentNo+"', 'PRN', '"+txnDate+"', CURDATE())"
  console.log(dbquery);

      con.query(dbquery, function(err, row) {

                          if (err) {
        console.error("❌ Journal insert DB Error:", err);
        return res.status(500).json({ error: 'Database error' });
                           } else {
                            console.log("New taxTxn created")
                           }

                       });
                      }




   drAmt = Math.abs(netTotal);
   crAmt = 0;

// add new invoiceTxn


dbquery = "INSERT INTO invoiceTxn (companyID, suppCustID, suppCustName, txnType, invType, pur_sal, documentNo, jvInit, voucherNo, invoiceNo, txnDate, txnParticular, invoiceTotal, discountTotal, taxID, taxRate, taxTotal, drAmt, crAmt, date_created) VALUE('" + companyID + "', '"+ supplierID + "', '"+ supplierName + "', '"+ txnType + "', '"+ invType + "', 'P', '"+documentNo+"', '"+jvInit+"', '"+voucherNo+"', '"+invoiceNo+"', '"+txnDate+"', '"+txnParticular+"', '"+txnAmount+"', '0.00', '"+taxID+"', '"+taxRate+"', '"+taxTotal+"', '"+drAmt+"',  '"+crAmt+"', CURDATE())"

console.log(dbquery);

    con.query(dbquery, function(err, row) {

                        if (err) {
       console.error("❌ Journal insert DB Error:", err);
        return res.status(500).json({ error: 'Database error' });
                         } else {
                          console.log("New invoiceTxn created")
                         }

                     });
   // update Product
   dbquery = "INSERT INTO productTxn (companyID, productID, sku, barcode, productName, invoiceNo, unit, unitPrice,  locationID, txnType, txnQtyOut, txnTotal, txnDate, txnParticular , document, suppCustID, voucherNo, date_created) VALUE('" + companyID + "', '"+ productID+"', '"+sku+"', '"+barcode+"', '"+productName+"', '"+invoiceNo+"', '"+unit+"', '"+unitPrice+"', '"+locationID+"', '"+txnType+"', '"+returnQuantity+"', '"+netTotal+"', '"+txnDate+"', '"+remark+"', '', '"+supplierID+"', '"+voucherNo+"', CURDATE())"

   console.log(dbquery);
       con.query(dbquery, function(err, row) {

                           if (err) {
       console.error("❌ Journal insert DB Error:", err);
        return res.status(500).json({ error: 'Database error' });
                            } else {
                             console.log("New ProductTxn created")
                              res.send('Success');
                              con.end();
                            }

                        });


    };


   

});


module.exports = router;
