var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql');


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
var jvInit = invData[0].invoiceNo.substring(0,4);
var customerID = invData[0].supplierID;
var invoiceNo = invData[0].invoiceNo;
var txnDate = invData[0].txnDate;
var dueDate = invData[0].dueDate;
var remark1 = invData[0].remark1;
var remark2 = invData[0].remark2;
var remark3 = invData[0].remark3;
var remark4 = invData[0].remark4;
var remark5 = invData[0].remark5;
var remark6 = invData[0].remark6;
var invType = 'SAL';
var customerName=invData[0].supplierName;
var salesRep = invData[0].salesRep;
var productID='';
var productName='';
var barcode = '';
var productDescription = '';
var salesQty=0;
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
var txnType = 'SALES';
//var remark = '';
var taxDescription = '';
var txnParticular = 'Sales Invoice';
var term = invData[0].paymentTerm;
// var dueDate = txnDate.getDate()+invData[0].paymentTerm

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
   salesQty=invData[i].salesQuantity;
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
   remark = invData[i].salesParticular;
   taxDescription = invData[i].taxDescription;




                          // create new record
dbquery = "INSERT INTO salesInvoice (companyID, customerID, customerName, invoiceNo, invoiceDate, productID, barcode, productName, productDescription, unit, salesQty, unitPrice,  itemDiscount, taxID, taxType, taxCode, taxRate, itemTotal, taxItemTotal, itemNetTotal, voucherNo, jvInit, dueDate, salesRep, remark1, remark2, remark3, remark4, remark5, remark6, date_created) VALUE('" + companyID + "', '"+ customerID + "', '"+ customerName + "', '"+ invoiceNo + "', '"+ txnDate + "', '"+productID+"', '"+barcode+"', '"+productName+"', '"+productDescription+"', '"+unit+"', '"+salesQty+"', '"+unitPrice+"', '"+itemDiscount+"', '"+taxID+"', '"+taxType+"', '"+taxCode+"', '"+taxRate+"', '"+itemTotal+"', '"+itemTax+"', '"+itemNetTotal+"', '"+voucherNo+"','"+jvInit+"', '"+dueDate+"','"+salesRep+"','"+remark1+"', '"+remark2+"', '"+remark3+"', '"+remark4+"', '"+remark5+"', '"+remark6+"', CURDATE())"

 console.log(dbquery);

      con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                          //  res.send(alert(err+" occured in input data, update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New Sales invoice created")
                            res.send('success');
                           }

                       });

 // add productTxn

 dbquery = "INSERT INTO productTxn (companyID, productID, sku, barcode, productName, invoiceNo, unit, unitPrice,  locationID, txnType, txnQtyOut, txnTotal, txnDate, txnParticular , document, suppCustID, voucherNo, date_created) VALUE('" + companyID + "', '"+ productID+"', '"+sku+"', '"+barcode+"', '"+productName+"', '"+invoiceNo+"', '"+unit+"', '"+unitPrice+"', '"+locationID+"', '"+txnType+"', '"+salesQty+"', '"+itemNetTotal+"', '"+txnDate+"', '"+txnParticular+"', '', '"+customerID+"', '"+voucherNo+"', CURDATE())"

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
                           res.send('success');
                          }

                      });

  // add taxTxn
   if (taxType === 'OUTPUT') {
  dbquery = "INSERT INTO taxTxn (companyID, taxID, taxType, taxCode, taxDescription, remark, itemAmount, taxRate, taxAmount, suppCustID, documentNo, documentType, document_date, date_created) VALUE('" + companyID + "', '"+ taxID + "', '"+ taxType + "', '"+ taxCode + "', '"+ taxDescription + "', '"+remark+"', '"+itemTotal+"', '"+taxRate+"', '"+itemTax+"', '"+customerID+"', '"+invoiceNo+"', 'SAL', '"+txnDate+"', CURDATE())"

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
                            res.send('success');
                           }

                       });


  }  // for
}
// add new invoiceTxn


dbquery = "INSERT INTO invoiceTxn (companyID, suppCustID, suppCustName, txnType, invType, pur_sal, documentNo, jvInit, voucherNo, invoiceNo, txnDate, txnParticular, invoiceTotal, discountTotal, taxID, taxRate, taxTotal, drAmt, crAmt, term, date_created) VALUE('" + companyID + "', '"+ customerID + "', '"+ customerName + "', '"+ txnType + "', '"+ invType + "', 'S', '', '"+jvInit+"', '"+voucherNo+"', '"+invoiceNo+"', '"+txnDate+"', '"+txnParticular+"', '"+invTotal+"', '"+invDiscount+"', '', '0', '"+invTax+"', '"+invNetTotal+"', '0', '"+term+"', CURDATE())"

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
                          res.send('success');
                         }

                     });

  // con.end();

});


module.exports = router;
