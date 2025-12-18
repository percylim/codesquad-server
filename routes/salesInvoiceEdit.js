const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const moment = require('moment');

router.post('/', async function (req, res) {
  const invData = req.body;

  if (!invData || invData.length === 0) {
    return res.status(400).send('No data received');
  }

  const companyID = invData[0].companyID;
  const voucherNo = invData[0].voucherNo.toUpperCase();
  const jvInit = invData[0].invoiceNo.substring(0, 4);
  const customerID = invData[0].supplierID;
  const invoiceNo = invData[0].invoiceNo;
  const txnDate = moment(invData[0].txnDate).format('YYYY-MM-DD');
  const dueDate = moment(invData[0].dueDate).format('YYYY-MM-DD');
  const remark1 = invData[0].remark1;
  const remark2 = invData[0].remark2;
  const remark3 = invData[0].remark3;
  const remark4 = invData[0].remark4;
  const remark5 = invData[0].remark5;
  const remark6 = invData[0].remark6;
  const invType = 'SAL';
  const customerName = invData[0].supplierName;
  const salesRep = invData[0].salesRep;
  const term = invData[0].paymentTerm;
  const userName = invData[0].userName;
  const reasons = invData[0].remark;
  const txnParticular = 'Sales Invoice';

  let invTotal = 0, invDiscount = 0, invTax = 0, invNetTotal = 0;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "+00:00",
  });

  try {
    await connection.beginTransaction();
    console.log("🔄 Starting sales invoice edit for:", invoiceNo);

    // Fetch current invoice to backup
    const [existingRows] = await connection.query(
      `SELECT * FROM salesInvoice WHERE companyID = ? AND customerID = ? AND invoiceNo = ?`,
      [companyID, customerID, invoiceNo]
    );

    if (existingRows.length === 0) {
      return res.status(404).send("Invalid Sales Invoice No.");
    }

    // Backup existing to salesInvoiceChange
    for (const row of existingRows) {
      await connection.query(
        `INSERT INTO salesInvoiceChange (
          companyID, customerID, customerName, invoiceNo, invoiceDate, productID, barcode, productName,
          productDescription, unit, salesQty, unitPrice, itemDiscount, taxID, taxType, taxCode,
          taxRate, itemTotal, taxItemTotal, itemNetTotal, voucherNo, jvInit, dueDate, salesRep,
          remark1, remark2, remark3, remark4, remark5, remark6, txnDate, itemTax, salesQuantity,
          dateChange, userChange, reasons, status, cost, date_created
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), ?, ?, 'ED', ?, CURDATE())`,
        [
          companyID, customerID, customerName, invoiceNo, txnDate, row.productID, row.barcode, row.productName,
          row.productDescription, row.unit, row.salesQuantity, row.unitPrice, row.itemDiscount, row.taxID, row.taxType,
          row.taxCode, row.taxRate, row.itemTotal, row.taxItemTotal, row.itemNetTotal, row.voucherNo, row.jvInit,
          dueDate, row.salesRep, row.remark1, row.remark2, row.remark3, row.remark4, row.remark5, row.remark6,
          txnDate, row.itemTax, row.salesQuantity, userName, reasons, row.cost
        ]
      );
    }

    // Delete previous invoice records
    await connection.query(
      `DELETE FROM salesInvoice WHERE companyID = ? AND customerID = ? AND invoiceNo = ?`,
      [companyID, customerID, invoiceNo]
    );
    await connection.query(
      `DELETE FROM productTxn WHERE companyID = ? AND txnType = ? AND invoiceNo = ?`,
      [companyID, 'SALES', invoiceNo]
    );
    await connection.query(
      `DELETE FROM taxTxn WHERE companyID = ? AND taxType = ? AND suppCustID = ? AND documentNo = ?`,
      [companyID, 'OUTPUT', customerID, invoiceNo]
    );
    await connection.query(
      `DELETE FROM invoiceTxn WHERE companyID = ? AND suppCustID = ? AND invoiceNo = ? AND txnType = ? AND pur_sal = ?`,
      [companyID, customerID, invoiceNo, 'SALES', 'S']
    );

    // Re-insert updated sales invoice
    for (const row of invData) {
      const itemTotal = parseFloat(row.itemTotal || 0);
      const itemDiscount = parseFloat(row.itemDiscount || 0);
      const itemTax = parseFloat(row.itemTax || 0);
      const itemNetTotal = parseFloat(row.itemNetTotal || 0);

      invTotal += itemTotal;
      invDiscount += itemDiscount;
      invTax += itemTax;
      invNetTotal += itemNetTotal;

      await connection.query(
        `INSERT INTO salesInvoice (
          companyID, customerID, customerName, invoiceNo, invoiceDate, productID, barcode, productName,
          productDescription, unit, salesQty, unitPrice, itemDiscount, taxID, taxType, taxCode,
          taxRate, itemTotal, taxItemTotal, itemNetTotal, voucherNo, jvInit, dueDate, salesRep,
          remark1, remark2, remark3, remark4, remark5, remark6, txnDate, itemTax, salesQuantity,
          cost, date_created
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
        [
          companyID, customerID, customerName, invoiceNo, txnDate, row.productID, row.barcode, row.productName,
          row.productDescription, row.unit, row.salesQuantity, row.unitPrice, row.itemDiscount, row.taxID, row.taxType,
          row.taxCode, row.taxRate, row.itemTotal, row.taxItemTotal, row.itemNetTotal, voucherNo, jvInit,
          dueDate, salesRep, remark1, remark2, remark3, remark4, remark5, remark6,
          txnDate, row.itemTax, row.salesQuantity, row.cost
        ]
      );

      // Save productTxn
      await connection.query(
        `INSERT INTO productTxn (
          companyID, productID, sku, barcode, productName, invoiceNo, unit, unitPrice,
          locationID, txnType, txnQtyOut, txnTotal, txnDate, txnParticular,
          document, suppCustID, voucherNo, date_created, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), 'EDITED')`,
        [
          companyID, row.productID, row.sku, row.barcode, row.productName, invoiceNo, row.unit, row.unitPrice,
          '', 'SALES', row.salesQuantity, row.itemNetTotal, txnDate, txnParticular,
          '', customerID, voucherNo
        ]
      );

      // Save taxTxn if needed
      if (row.taxType === 'OUTPUT') {
        await connection.query(
          `INSERT INTO taxTxn (
            companyID, taxID, taxType, taxCode, taxDescription, remark, itemAmount,
            taxRate, taxAmount, suppCustID, documentNo, documentType, document_date,
            date_created, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), 'EDITED')`,
          [
            companyID, row.taxID, row.taxType, row.taxCode, row.taxDescription, 'Edited Sales Invoice',
            row.itemTotal, row.taxRate, row.taxItemTotal, customerName, invoiceNo, 'SAL', txnDate
          ]
        );
      }
    }

    // Save invoiceTxn
    await connection.query(
      `INSERT INTO invoiceTxn (
        companyID, suppCustID, suppCustName, txnType, invType, pur_sal, documentNo, jvInit,
        voucherNo, invoiceNo, txnDate, txnParticular, invoiceTotal, discountTotal, taxID,
        taxRate, taxTotal, drAmt, crAmt, term, date_created, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), 'EDITED')`,
      [
        companyID, customerID, customerName, 'SALES', invType, 'S', '', jvInit,
        voucherNo, invoiceNo, txnDate, txnParticular, invTotal, invDiscount, '',
        0, invTax, invNetTotal, 0, term
      ]
    );

    await connection.commit();
    console.log("✅ Sales invoice edit completed:", invoiceNo);
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
