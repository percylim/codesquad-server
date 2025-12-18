const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const moment = require('moment');

router.post('/', async (req, res) => {
const invData = req.body;
const voucherData = req.body;
  const companyID = invData[0].companyID;
  const invoiceNo = invData[0].invoiceNo;
  const customerID = invData[0].supplierID;
  const customerName = invData[0].supplierName
  const txnDate = moment(invData[0].txnDate);
  const dueDate = moment(invData[0].dueDate);
  const voucherNo = invData[0].voucherNo;

  console.log("🔄 Starting voucher update ");
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "+00:00",
  });
  console.log(invData);

try {

 await connection.beginTransaction();
const [result] = await connection.query(
      `SELECT * FROM salesInvoice WHERE companyID = ? AND customerID = ? AND invoiceNo = ?`,
      [companyID, customerID, invoiceNo]
    );

    if (result.length === 0) {
      return res.status(404).send("Invalid Sales Invoice No.");
    }
     console.log(saleData);
 // for 1 
  for (const row of result) {   
moment(row.txnDate).format("YYYY-MM-DD");

connection.query(
        `INSERT INTO salesInvoiceChange (companyID, customerID, customerName, invoiceNo, invoiceDate, productID, barcode, productName, productDescription, unit, salesQty, unitPrice, itemDiscount, taxID, taxType, taxCode, taxRate, itemTotal, taxItemTotal, itemNetTotal, voucherNo, jvInit, dueDate, salesRep, remark1, remark2, remark3, remark4, remark5, remark6, txnDate, itemTax, salesQuantity, dateChange, userChange, reasons, status, cost, CURDATE())
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE()`,
        [companyID, customerID , customerName, invoiceNo, txnDate, row.productID, row.barcode, row.productName, row.productDescription, row.unit, row.salesQuantity, row.unitPrice, row.itemDiscount, row.taxID, 'OUTPUT', row.taxCode, row.taxRate, row.itemTotal, row.taxItemTotal, row.itemNetTotal, row.voucherNo,row.jvInit, dueDate, row.salesRep, row.remark1, row.remark2, row.remark3, row.remark4, row.remark5, row.remark6, txnDate, row.salesQuantity, row.itemTax, row.userName , row.reasons, 'ED', row.cost]
      );
    } // for 1
 
    // Example delete statement
   connection.query(
      `DELETE FROM salesInvoice WHERE companyID = ? AND customerID = ? AND invoiceNo = ?`,
      [companyID, customerID, invoiceNo]
    );

    console.log("Sales Invoice deleted:", result.affectedRows);

    // Add insert/update statements here using await connection.query(...)
for (const row of invData) { 
   

//delete invoiceTxn
   const [invResult] = connection.query(`
      DELETE FROM invoiceTxn 
      WHERE companyID = ? AND suppCustID = ? AND invoiceNo = ? AND txnType = 'SALES' AND pur_sal = 'S'
    `, [companyID, customerID, invoiceNo]);

    console.log("Invoice Txn deleted:", result.affectedRows);
 // delete taxTxn
 const [taxResult] = connection.query(`
      DELETE FROM taxTxn 
      WHERE companyID = ? AND suppCustID = ? AND documentNo = ? AND taxType = 'OUTPUT'
    `, [companyID, customerID, invoiceNo]);

console.log("taxTxn deleted:", result.affectedRows);

// update edited salesInvoice
// for 2
for (const row of invData) { 
connection.query(
        `INSERT INTO salesInvoice (companyID, customerID, customerName, invoiceNo, invoiceDate, productID, barcode, productName, productDescription, unit, salesQty, unitPrice, itemDiscount, taxID, taxType, taxCode, taxRate, itemTotal, taxItemTotal, itemNetTotal, voucherNo, jvInit, dueDate, salesRep, remark1, remark2, remark3, remark4, remark5, remark6, txnDate, itemTax, salesQuantity, dateChange, userChange, reasons, status, cost, CURDATE())
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE()`,
        [companyID, customerID , customerName, invoiceNo, txnDate, row.productID, row.barcode, row.productName, row.productDescription, row.unit, row.salesQuantity, row.unitPrice, row.itemDiscount, row.taxID, 'OUTPUT', row.taxCode, row.taxRate, row.itemTotal, row.taxItemTotal, row.itemNetTotal, row.voucherNo,row.jvInit, dueDate, row.salesRep, row.remark1, row.remark2, row.remark3, row.remark4, row.remark5, row.remark6, txnDate, row.salesQuantity, row.itemTax, row.userName , row.reasons, 'ED', row.cost]
      );
    };

// save productTxn
connection.query(
        `INSERT INTO productTxn (companyID, productID, sku, barcode, productName, invoiceNo, unit, unitPrice, locationID, txnType, txnQtyOut, txnTotal, txnDate, txnParticular, document, suppCustID, voucherNo,  CURDATE(), 'EDITED')
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE()`,
        [companyID, customerID ,  row.unit, row.unitPrice, row.locationID, row.txnType, row.txnQtyOut, row.txnTotal, row.txnDate, row.txnParticular, row.document, row.suppCustID, row.voucherNo ]
      );

    console.log('Product Txn Saved');
 
if (row.taxType === 'OUTPUT') {
connection.query(
        `INSERT INTO taxTxn (companyID, taxID, taxType, taxCode, taxDescription, remark, itemAmount, taxRate, taxAmount, suppCustID, document, documentType, document_date,   CURDATE(), 'EDITED')
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?`,
        [companyID, row.taxID,  row.taxType, row.taxCode, row.taxDescription, row.remark, row.itemAmount, row.taxRate, row.taxAmount, customerID, row.document, row.documentType, row.document_date ]
      );
      console.log("Tax Txn Saved");
    }
    
    // insert into invoiceTxn
 
 connection.query(
        `INSERT INTO invoiceTxn (companyID, suppCustID, suppCustName, txnType, invType, pur_sal, documentNo, jvInit, voucherNo, invoiceNo, txnDate, txnParticular, invoiceTotal, discountTotal, taxID, taxRate, taxTotal, drAmt, crAmt, term)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), 'EDITED'`,
        [companyID, customerID , customerName, row.txnType, row.invType, row.pur_sal, row.documentNo, row.jvInit, row.voucherNo, row.txnDate, row.txnParticular, row.invoiceTotal, row.discountTotal, row.taxID, row.taxRate, row.taxTotal, row.drAmt, row.crAmt, row.term]
      );
    
  console.log("Invoice Txn Saved");

    await connection.commit();
    res.send('Success');     






} catch (err) { // try
    await connection.rollback();
    console.error('❌ Transaction error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  } finally {
    await connection.end();
  }

});

module.exports = router;
