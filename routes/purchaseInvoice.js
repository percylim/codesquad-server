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
//  console.log(invData[0].productID);
var companyID = invData[0].companyID;
var voucherNo = invData[0].voucherNo.toUpperCase();
var jvInit = voucherNo.substring(0,4);
var supplierID = invData[0].supplierID;
var invoiceNo = invData[0].invoiceNo;
var txnDate = invData[0].txnDate;
var invType = invData[0].invType;
var supplierName=invData[0].supplierName;
var productID='';
var productName='';
var barcode = '';
var productDescription = '';
var purchaseQty=0;
var unit = '';
var unitPrice= 0;
var itemTotal= 0;
var itemDiscount= 0;
var itemTax = 0;
var itemNetTotal = 0;
var taxID = '' ;
var taxType = '';
var taxCode = '';
var locationID = '';
var invTotal = 0;
var invDiscount = 0;
var invTax = 0;
var invNetTotal = 0;
var prodQuery = '';
var taxRate = 0;
var sku = '';
var txnType = 'PURCHASE';
var remark = '';
var taxDescription = '';
var txnParticular = 'Puchase Invoice';
var term = invData[0].paymentTerm;
let date = new Date(txnDate);
//var dueDate= date.setDate(date.getDate() + term);
var dueDate = invData[0].dueDate;
console.log(dueDate);
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

   productID=invData[i].productID;
   barcode=invData[i].barcode;
   productName=invData[i].productName;
   purchaseQty=invData[i].purchaseQty;
   unit = invData[i].unit;
   unitPrice= invData[i].unitPrice;
   itemTotal = invData[i].itemTotal;
   itemDiscount= invData[i].itemDiscount;
   itemTax = invData[i].itemTax;
   itemNetTotal = invData[i].itemNetTotal;
   taxID = invData[i].taxID;
   taxType = invData[i].taxType;
   taxCode = invData[i].taxCode;
   taxRate = invData[i].taxRate;
   locationID = '';
   invTotal += parseFloat(invData[i].itemTotal);
   invDiscount += parseFloat(invData[i].itemDiscount);
   invTax += parseFloat(invData[i].itemTax);
   invNetTotal += parseFloat(invData[i].itemNetTotal);
   productDescription = '';
   sku = '';
   remark = invData[i].remark;
   taxDescription = invData[i].taxDescription;




                          // create new record
dbquery = "INSERT INTO purchaseInvoice (companyID, supplierID, supplierName, invoiceNo, invoiceDate, productID, barcode, productName, productDescription, unit, purchaseQty, unitPrice,  itemDiscount, invType, taxID, taxType, taxCode, taxRate, itemTotal, itemTaxTotal, itemNetTotal, voucherNo, jvInit, date_created) VALUE('" + companyID + "', '"+ supplierID + "', '"+ supplierName + "', '"+ invoiceNo + "', '"+ txnDate + "', '"+productID+"', '"+barcode+"', '"+productName+"', '"+productDescription+"', '"+unit+"', '"+purchaseQty+"', '"+unitPrice+"', '"+itemDiscount+"', '"+invType+"', '"+taxID+"', '"+taxType+"', '"+taxCode+"', '"+taxRate+"', '"+itemTotal+"', '"+itemTax+"', '"+itemNetTotal+"', '"+voucherNo+"','"+jvInit+"', CURDATE())"

 console.log(dbquery);
      con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                          //  res.send(alert(err+" occured in input data, update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New purchase invoice created")
                           }

                       });

 // add productTxn if not none stock item
 if (productID !=='*') {
 dbquery = "INSERT INTO productTxn (companyID, productID, sku, barcode, productName, invoiceNo, unit, unitPrice,  locationID, txnType, txnQtyIn, txnTotal, txnDate, txnParticular , document, suppCustID, voucherNo, date_created) VALUE('" + companyID + "', '"+ productID+"', '"+sku+"', '"+barcode+"', '"+productName+"', '"+invoiceNo+"', '"+unit+"', '"+unitPrice+"', '"+locationID+"', '"+txnType+"', '"+purchaseQty+"', '"+itemNetTotal+"', '"+txnDate+"', '"+txnParticular+"', '', '"+supplierID+"', '"+voucherNo+"', CURDATE())"

console.log(dbquery);
     con.query(dbquery, function(err, row) {

                         if (err) {
                           //console.log(err.message);
                           console.log(err);
                         //  res.send(alert(err+" occured in input data, update fail"));
                          //res.sendStatus(500);
                          // return;
                          } else {
                           console.log("New ProductTxn created")
                          }

                      });

dbquery ="UPDATE product SET cost='"+unitPrice+"' where companyID='"+companyID+"' AND productID='"+productID+"'"
console.log(dbquery);
     con.query(dbquery, function(err, row) {

                         if (err) {
                           //console.log(err.message);
                           console.log(err);
                         //  res.send(alert(err+" occured in input data, update fail"));
                          //res.sendStatus(500);
                          // return;
                          } else {
                           console.log("New ProductT Cost Added")
                          }

                      });
 }

  // add taxTxn if is not free of tax
  if (taxType !=="FOT") {
  dbquery = "INSERT INTO taxTxn (companyID, taxID, taxType, taxCode, taxDescription, remark, itemAmount, taxRate, taxAmount, suppCustID, documentNo, documentType, document_date, date_created) VALUE('" + companyID + "', '"+ taxID + "', '"+ taxType + "', '"+ taxCode + "', '"+ taxDescription + "', '"+remark+"', '"+itemTotal+"', '"+taxRate+"', '"+itemTax+"', '"+supplierName+"', '"+invoiceNo+"', 'PUR', '"+txnDate+"', CURDATE())"

  console.log(dbquery);
      con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                          //  res.send(alert(err+" occured in input data, update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New taxTxn created")
                           }

                       });


  }
}
// add new invoiceTxn


dbquery = "INSERT INTO invoiceTxn (companyID, suppCustID, suppCustName, txnType, invType, pur_sal, documentNo, jvInit, voucherNo, invoiceNo, txnDate, txnParticular, invoiceTotal, discountTotal, taxID, taxRate, taxTotal, drAmt, crAmt, term, date_created) VALUE('" + companyID + "', '"+ supplierID + "', '"+ supplierName + "', '"+ txnType + "', '"+ invType + "', 'P', '', '"+jvInit+"', '"+voucherNo+"', '"+invoiceNo+"', '"+txnDate+"', '"+txnParticular+"', '"+invTotal+"', '"+invDiscount+"', '', '0', '"+invTax+"', '0',  '"+invNetTotal+"', '"+term+"', CURDATE())"

console.log(dbquery);
    con.query(dbquery, function(err, row) {

                        if (err) {
                          //console.log(err.message);
                          console.log(err);
                        //  res.send(alert(err+" occured in input data, update fail"));
                         //res.sendStatus(500);
                         // return;
                         } else {
                          console.log("New invoiceTxn created")
                         }

                     });


//  con.end()
});


module.exports = router;
