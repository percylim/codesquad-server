 var express = require('express');
 var router = express.Router();
 var mysql = require('mysql2');
 var moment = require('moment');


 router.post('/', function(req, res, next) {
  var invData = req.body;
  //console.log('axios post to purhcase Invoice');
  console.log(invData) ;
//   newDatas[i].voucherNo= voucherNo;
// Sales Credit / Debit Note update
var companyID = invData[0].companyID;
var voucherNo = invData[0].voucherNo.toUpperCase();

var noteInit = invData[0].documentNo.substr(3.4);
var supplierID = invData[0].supplierID;
var supplierName=invData[0].supplierName;
var invoiceNo = '' ;
var txnDate = invData[0].txnDate;
var jvInit = txnDate.substring(0,4);
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
var txnParticular = 'Sales Invoice Credit Note';
var documentType= 'SCN';
  if (invType === 'SDN') {
     txnType = 'DEBIT NOTE';
     txnParticular = 'Sales Invoice Debit Note';
     documentType = 'SDN';
  }

//console.log(invData);
//return alert("DR/Cr Note ready to update");
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
   remark = invData[i].remark;
   invoiceNo = invData[i].invoiceNo;
   documentNo = invData[i].documentNo;
   taxDescription = invData[i].taxDescription;
   txnParticular = invData[i].txnParticular;
   txnAmount = parseFloat(invData[i].txnAmount);
   taxTotal = parseFloat(invData[i].taxTotal);
   noteTaxTotal += parseFloat(invData[i].taxTotal);
   netTotal = parseFloat(invData[i].netTotal);
   txnTotal+=txnAmount;
   txnTaxTotal+=taxTotal;
   txnNetTotal+=netTotal;





  // add taxTxn
  if (taxType === 'OUTPUT') {
  dbquery = "INSERT INTO taxTxn (companyID, taxID, taxType, taxCode, taxDescription, remark, itemAmount, taxRate, taxAmount, suppCustID, documentNo, documentType, document_date, date_created) VALUE('" + companyID + "', '"+ taxID + "', '"+ taxType + "', '"+ taxCode + "', '"+ taxDescription + "', '"+remark+"', '"+txnAmount+"', '"+taxRate+"', '"+taxTotal+"', '"+supplierName+"', '"+invoiceNo+"', '"+documentType+"', '"+txnDate+"', CURDATE())"
  console.log(dbquery);
      con.query(dbquery, function(err, row) {

                          if (err) {
          console.error('❌ Insert taxTxn DB Error:', err);
                     return res.status(500).json({ error: 'Database error' });
                           } 
                            console.log("New taxTxn created")
                           

                       });
  }



  if (invType === 'SDN') {
    drAmt = invData[i].netTotal;
    crAmt = 0;
  } else {
   crAmt = invData[i].netTotal;
   drAmt = 0;
  }
// add new invoiceTxn


dbquery = "INSERT INTO invoiceTxn (companyID, suppCustID, suppCustName, txnType, invType, pur_sal, documentNo, jvInit, voucherNo, invoiceNo, txnDate, txnParticular, invoiceTotal, discountTotal, taxID, taxRate, taxTotal, drAmt, crAmt, date_created) VALUE('" + companyID + "', '"+ supplierID + "', '"+ supplierName + "', '"+ txnType + "', '"+ invType + "', 'S', '"+documentNo+"', '"+jvInit+"', '"+voucherNo+"', '"+invoiceNo+"', '"+txnDate+"', '"+txnParticular+"', '"+txnAmount+"', '0.00', '', '0', '"+taxTotal+"', '"+drAmt+"',  '"+crAmt+"', CURDATE())"

console.log(dbquery);
    con.query(dbquery, function(err, row) {

                        if (err) {
                  console.error('❌ Insert InvoiceTxn DB Error:', err);
                     return res.status(500).json({ error: 'Database error' });
                         } 
                         con.end();

                          console.log("New invoiceTxn created");
                          res.send("Success");

                     });

    };
  // con.end();

});


module.exports = router;
