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
var companyID = invData[0].companyID;
var voucherNo = invData[0].voucherNo.toUpperCase();
var jvInit = voucherNo.substring(0,4);
var supplierID = invData[0].supplierID;
var supplierName=invData[0].supplierName;
var invoiceNo = '' ;
var txnDate = invData[0].txnDate;
var invType = invData[0].invType;
var documentNo = '';

var taxID = '' ;
var taxRate = 0 ;
var taxCode = '';
// var txnParticular = '';
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
var txnType = 'CREDIT NOTE';
var txnParticular = 'Purchase Invoice Credit Note';
var documentType= 'PCN';
  if (invType === 'PDN') {
     txnType = 'DEBIT NOTE';
     txnParticular = 'Purchase Invoice Debit Note';
     documentType = 'PDN';
  }

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
//let hasError = false;
  let completed = 0;

 for (let i = 0; i < invData.length; i++) {
   taxID = invData[i].taxID;
   taxCode = invData[i].taxCode;
   taxRate = invData[i].taxRate;
   taxType = invData[i].taxType;
   remark = invData[i].remark;
   invoiceNo = invData[i].invoiceNo;
   documentNo = invData[i].documentNo;
   taxDescription = invData[i].taxDescription;
   txnDescription = invData[i].txnParticular;
   txnAmount = parseFloat(invData[i].txnAmount);
   taxTotal = parseFloat(invData[i].taxTotal);
   noteTaxTotal += parseFloat(invData[i].taxTotal);
   netTotal = invData[i].netTotal;
   txnTotal+=txnAmount;
   txnTaxTotal+=taxTotal;
   txnNetTotal+=netTotal;
  if (taxType === 'INPUT' || taxTotal !== 0) {
  dbquery = "INSERT INTO taxTxn (companyID, taxID, taxType, taxCode, taxDescription, remark, itemAmount, taxRate, taxAmount, suppCustID, documentNo, documentType, document_date, date_created) VALUE('" + companyID + "', '"+ taxID + "', '"+ taxType + "', '"+ taxCode + "', '"+ taxDescription + "', '"+remark+"', '"+txnAmount+"', '"+taxRate+"', '"+taxTotal+"', '"+supplierName+"', '"+invoiceNo+"', '"+documentType+"', '"+txnDate+"', CURDATE())"
  console.log(dbquery);
      con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.messag
                            console.log(err);
                             return (alert(err.message));
                           } else {
                            console.log("New taxTxn created")
                           }

                       });
  }



  if (invType === 'PDN') {
    drAmt = Math.abs(netTotal);
    crAmt = 0;
  } else {
   crAmt = Math.abs(netTotal);
   drAmr = 0;
  }
// add new invoiceTxn


dbquery = "INSERT INTO invoiceTxn (companyID, suppCustID, suppCustName, txnType, invType, pur_sal, documentNo, jvInit, voucherNo, invoiceNo, txnDate, txnParticular, invoiceTotal, discountTotal, taxID, taxRate, taxTotal, drAmt, crAmt, date_created) VALUE('" + companyID + "', '"+ supplierID + "', '"+ supplierName + "', '"+ txnType + "', '"+ invType + "', 'P', '"+documentNo+"', '"+jvInit+"', '"+voucherNo+"', '"+invoiceNo+"', '"+txnDate+"', '"+txnParticular+"', '"+txnAmount+"', '0.00', '', '0', '"+taxTotal+"', '"+drAmt+"',  '"+crAmt+"', CURDATE())"

console.log(dbquery);
    con.query(dbquery, function(err, row) {

                        if (err) {
      
        console.error("❌ Journal insert DB Error:", err);
        return res.status(500).json({ error: 'Database error' });
                        //  res.send(alert(err+" occured in input data, update fail"));
                         res.sendStatus(500);
                         // return;
                         } else {
                          completed++ 
                         if (completed === invData.length) {
                           console.log("New invoiceTxn created");
                          res.send("Success");

                           con.end();
                         }
                        }

                     });

    };
  // con.end();

});


module.exports = router;
