const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const moment = require('moment');


router.post('/', async function(req, res) {
  var invData = req.body;
  //console.log('axios post to purhcase Invoice');
  console.log(invData) ;
var companyID = invData[0].companyID;
var voucherNo = invData[0].voucherNo.toUpperCase();

var customerID = invData[0].supplierID;
var customerName=invData[0].supplierName;
var invoiceNo = '' ;
var txnDate = invData[0].txnDate;
const txnDateStr = moment(txnDate).format('YYYY-MM-DD'); // or 'YYYYMMDD'
const jvInit = txnDateStr.substring(0, 4); // now it's saf

var invType = 'SPY';
var documentNo = invData[0].documentNo;
var receiptNo = invData[0].receiptNo;
// var taxDescription = '';
var remark = '';
var txnTotal= 0;
var txnAmount = 0;
var taxAmount = 0;
var taxTotal = 0;
var invTotal =0;
var noteTaxTotal = 0;
var netTotal = 0;
var txnTaxTotal = 0;
var txnNetTotal = 0
var drAmt =0;
var crAmt = 0;
var txnType = 'PAYMENT';
var documentType= 'SPY';
var txnParticular = invData[0].paymentParticular;
var term = invData[0].term;


console.log(invData);

   //  console.log(req.body.password+req.body.adminName+req.body.companyID+ " "+ md5Password);
 const connection = await mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     timezone: "+00:00",
   });


 try {
    await connection.beginTransaction();
    console.log("🔄 Starting Sales Payment Update");


for (const row of invData) {
 
   invoiceNo = row.invoiceNo;//
   txnParticular = row.paymentParticular;
   txnAmount = parseFloat(row.payAmount);
   drAmt = 0.00;
   crAmt = parseFloat(row.payAmount);
   taxTotal = 0.00;
   noteTaxTotal = 0.00;
   netTotal = crAmt; //invData[i].payAmount;
   invTotal+=txnAmount;
   txnTaxTotal+=invTotal;
   txnNetTotal+=netTotal;
   invDiscount = 0.00;


await connection.query(
      `INSERT INTO invoiceTxn (
        companyID, suppCustID, suppCustName, txnType, invType, 
        pur_sal, documentNo, receiptNo, jvInit,voucherNo,
        invoiceNo, txnDate, txnParticular, invoiceTotal, discountTotal,
        taxID, taxRate, taxTotal, drAmt, crAmt,
        term, date_created, status

      ) VALUES (?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, 
                ?, CURDATE(), 'PAYMENT')`,
      [
        companyID, customerID, customerName, 'SAL', invType,
        'S', documentNo, receiptNo, jvInit,voucherNo,
        invoiceNo, txnDate, txnParticular, invTotal, invDiscount,
        '',0, 0, drAmt, crAmt,
        term
      ]
    );  

  };
 await connection.commit();
    console.log("✅ Sales invoice Payment completed:", customerID);
    res.send('Success');


  } catch (err) {
    await connection.rollback();
    console.error('❌ Error during sales invoice edit:', err);
    res.status(500).json({ error: err.message });
  } finally {
    await connection.end();
  }


});


module.exports = router;
