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
var txnType = 'OUTPUT';
//var remark = '';
var taxDescription = '';
var txnParticular = 'Sales Invoice';
var term = invData[0].paymentTerm;
var userName = invData[0].userName;
var reasons = invData[0].remark;
var cost = invData[0].cost;
// var dueDate = txnDate.getDate()+invData[0].paymentTerm
var saleData = [];
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

  dbquery = "select * from salesInvoice where companyID='"+companyID+"' and invoiceNo ='"+invoiceNo+"'"
  console.log(dbquery);
  con.query(dbquery, function(err, results, fields) {
 //   const journalData = results;
//    console.log(results);
         if (err) {
           //console.log(err.message);
           console.log(err);
           res.sendStatus(500);
           return;
        } else {
            if (results.length === 0) {
              return alert("Invalid Sales InvoiceNo. "+invoiceNo);
            }
           if (results.length>0) {   // 2
             saleData = results;
           }
        }
            console.log('********** saleData Loaded ******* '+saleData.length);
            console.log(saleData);


// update sales Invoice change
console.log('********** ready to save to salesInvoiceChange ******* '+saleData.length);
for (let i = 0; i < saleData.length; i++) {
  console.log('********** save to salesInvoiceChange table *******');
dbquery = "INSERT INTO salesInvoiceChange (companyID, customerID, customerName, invoiceNo, invoiceDate, productID, barcode, productName, productDescription, unit, salesQty, unitPrice,  itemDiscount, taxID, taxType, taxCode, taxRate, itemTotal, taxItemTotal, itemNetTotal, voucherNo, jvInit, dueDate, salesRep, remark1, remark2, remark3, remark4, remark5, remark6, dateChange, userChange, reasons, status, cost, date_created) VALUE('" + companyID + "', '"+ customerID + "', '"+ customerName + "', '"+ invoiceNo + "', '"+ txnDate + "', '"+saleData[i].productID+"', '"+saleData[i].barcode+"', '"+saleData[i].productName+"', '"+saleData[i].productDescription+"', '"+saleData[i].unit+"', '"+saleData[i].salesQty+"', '"+saleData[i].unitPrice+"', '"+saleData[i].itemDiscount+"', '"+saleData[i].taxID+"', '"+saleData[i].taxType+"', '"+saleData[i].taxCode+"', '"+saleData[i].taxRate+"', '"+saleData[i].itemTotal+"', '"+saleData[i].taxItemTotal+"', '"+saleData[i].itemNetTotal+"', '"+saleData[i].voucherNo+"','"+saleData[i].jvInit+"', '"+saleData[i].dueDate+"','"+saleData[i].salesRep+"','"+saleData[i].remark1+"', '"+saleData[i].remark2+"', '"+saleData[i].remark3+"', '"+saleData[i].remark4+"', '"+saleData[i].remark5+"', '"+saleData[i].remark6+"', CURDATE(),'"+userName+"', '"+reasons+"', 'ED', '"+saleData[i].cost+"',   CURDATE())"

 console.log(dbquery);

      con.query(dbquery, function(err, row) {

                          if (err) {
                            //console.log(err.message);
                            console.log(err);
                          //  res.send(alert(err+" occured in input data, update fail"));
                           //res.sendStatus(500);
                           // return;
                           } else {
                            console.log("New Sales invoice edited")
                        //    res.send('success');
                           }

                       });

} // for
});

/// return(alert('change save'));
   dbquery = "DELETE FROM salesInvoice where companyID = '"+companyID+"' AND customerID = '"+customerID+"' and invoiceNo= '"+invoiceNo+"'"
   console.log(dbquery);

        con.query(dbquery, function(err, result) {
          if (err) throw err;
              console.log("Number of Sales Invoice deleted: " + result.affectedRows);

        });


                               dbquery = "DELETE FROM productTxn where companyID = '"+companyID+"' AND txnType = 'SALES' and invoiceNo= '"+invoiceNo+"'"
                               console.log(dbquery);

                                    con.query(dbquery, function(err, result) {
                                      if (err) throw err;
                                          console.log("Number of Sales Product Transaction deleted: " + result.affectedRows);

                                    });

                                    dbquery = "DELETE FROM invoiceTxn where companyID = '"+companyID+"' AND suppCustID = '"+customerID+"' and invoiceNo= '"+invoiceNo+"' AND txnType='SALES' AND pur_sal='S'"
                                    console.log(dbquery);

                                         con.query(dbquery, function(err, result) {
                                           if (err) throw err;
                                               console.log("Number of Sales Invoice deleted: " + result.affectedRows);

                                         });
                                         dbquery = "DELETE FROM taxTxn where companyID = '"+companyID+"' AND taxType='OUTPUT' AND suppCustID = '"+customerID+"' and documentNo= '"+invoiceNo+"'"
                                         console.log(dbquery);

                                              con.query(dbquery, function(err, result) {
                                                if (err) throw err;
                                                    console.log("Number of Sales Invoice deleted: " + result.affectedRows);

                                              });

 for (let i = 0; i < invData.length; i++) {

   productID=invData[i].productID;
   barcode=invData[i].barcode;
   productName=invData[i].productName;
   salesQty=invData[i].salesQuantity;
   unit = invData[i].unit;
   unitPrice= invData[i].unitPrice;
   cost = invData[i].cost;
   itemTotal = invData[i].itemTotal;
   itemDiscount= invData[i].itemDiscount;
   taxItemTotal = invData[i].taxItemTotal;
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
   remark = 'Edited Sales Invoice';
   taxDescription = '';




                          // create new record
dbquery = "INSERT INTO salesInvoice (companyID, customerID, customerName, invoiceNo, invoiceDate, productID, barcode, productName, productDescription, unit, salesQty, unitPrice,  itemDiscount, taxID, taxType, taxCode, taxRate, itemTotal, taxItemTotal, itemNetTotal, voucherNo, jvInit, dueDate, salesRep, remark1, remark2, remark3, remark4, remark5, remark6, date_created, status, cost) VALUE('" + companyID + "', '"+ customerID + "', '"+ customerName + "', '"+ invoiceNo + "', '"+ txnDate + "', '"+productID+"', '"+barcode+"', '"+productName+"', '"+productDescription+"', '"+unit+"', '"+salesQty+"', '"+unitPrice+"', '"+itemDiscount+"', '"+taxID+"', '"+taxType+"', '"+taxCode+"', '"+taxRate+"', '"+itemTotal+"', '"+taxItemTotal+"', '"+itemNetTotal+"', '"+voucherNo+"','"+jvInit+"', '"+dueDate+"','"+salesRep+"','"+remark1+"', '"+remark2+"', '"+remark3+"', '"+remark4+"', '"+remark5+"', '"+remark6+"', CURDATE(), 'EDITED', '"+cost+"')"

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
                        //    res.send('success');
                           }

                       });


 // add productTxn

 dbquery = "INSERT INTO productTxn (companyID, productID, sku, barcode, productName, invoiceNo, unit, unitPrice,  locationID, txnType, txnQtyOut, txnTotal, txnDate, txnParticular , document, suppCustID, voucherNo, date_created, status) VALUE('" + companyID + "', '"+ productID+"', '"+sku+"', '"+barcode+"', '"+productName+"', '"+invoiceNo+"', '"+unit+"', '"+unitPrice+"', '"+locationID+"', '"+txnType+"', '"+salesQty+"', '"+itemNetTotal+"', '"+txnDate+"', '"+txnParticular+"', '', '"+customerID+"', '"+voucherNo+"', CURDATE(), 'EDITED')"

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
                          // res.send('success');
                          }

                      });




  // add taxTxn
   if (taxType === 'OUTPUT') {
  dbquery = "INSERT INTO taxTxn (companyID, taxID, taxType, taxCode, taxDescription, remark, itemAmount, taxRate, taxAmount, suppCustID, documentNo, documentType, document_date, date_created, status) VALUE('" + companyID + "', '"+ taxID + "', '"+ taxType + "', '"+ taxCode + "', '"+ taxDescription + "', '"+remark+"', '"+itemTotal+"', '"+taxRate+"', '"+taxItemTotal+"', '"+customerName+"', '"+invoiceNo+"', 'SAL', '"+txnDate+"', CURDATE(), 'EDITED')"

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
                      //      res.send('success');
                           }

                       });


  }  // for
}
// add new invoiceTxn


dbquery = "INSERT INTO invoiceTxn (companyID, suppCustID, suppCustName, txnType, invType, pur_sal, documentNo, jvInit, voucherNo, invoiceNo, txnDate, txnParticular, invoiceTotal, discountTotal, taxID, taxRate, taxTotal, drAmt, crAmt, term, date_created, status) VALUE('" + companyID + "', '"+ customerID + "', '"+ customerName + "', '"+ txnType + "', '"+ invType + "', 'S', '', '"+jvInit+"', '"+voucherNo+"', '"+invoiceNo+"', '"+txnDate+"', '"+txnParticular+"', '"+invTotal+"', '"+invDiscount+"', '', '0', '"+invTax+"', '"+invNetTotal+"', '0', '"+term+"', CURDATE(), 'EDITED')"

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
                      //    res.send('success');
                         }

                     });

//   con.end();

});


module.exports = router;
