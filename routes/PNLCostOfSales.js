const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "+00:00",
  connectionLimit: 10
});

router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;

    let cosData = [];
    let stockOpenBal = 0;
    let stockCloseBal = 0;

    // 1️⃣ Get Stock Opening Balance (glType = 804)
    const [stockRows] = await pool.query(
      "SELECT opBalance FROM glAccount WHERE companyID = ? AND glType = '804'",
      [companyID]
    );
    const opBal = stockRows.length ? stockRows[0].opBalance : 0;

    // 2️⃣ Get Products
    const [products] = await pool.query(
      "SELECT * FROM product WHERE companyID = ? ORDER BY productID",
      [companyID]
    );

    let sumOpBal = 0;
    let qtyIn = 0;
    let qtyOut = 0;

    for (const product of products) {
      // Opening stock transactions before startDate
      const [sumRows] = await pool.query(
        `SELECT SUM(txnQtyIn - txnQtyOut * unitPrice) AS sumBalance
         FROM productTxn 
         WHERE companyID = ? AND productID = ? AND txnDate < ?`,
        [companyID, product.productID, startDate]
      );
      const sumBalance = sumRows[0].sumBalance || 0;
      sumOpBal += sumBalance;

      // Transactions within the date range
      const [txnRows] = await pool.query(
        `SELECT txnQtyIn, txnQtyOut, unitPrice 
         FROM productTxn 
         WHERE companyID = ? AND productID = ? 
         AND txnDate >= ? AND txnDate <= ? 
         ORDER BY txnDate, voucherNo ASC`,
        [companyID, product.productID, startDate, endDate]
      );

      for (const txn of txnRows) {
        qtyIn += (txn.txnQtyIn || 0) * txn.unitPrice;
        qtyOut += (txn.txnQtyOut || 0) * txn.unitPrice;
      }
    }

    stockOpenBal = opBal + sumOpBal;
    const sumCloseBal = qtyIn - qtyOut;
    stockCloseBal = stockOpenBal + sumCloseBal;

    // Add opening balance
    cosData.push({
      addNo: '',
      glName: 'Inventory Opening Balance',
      totalText: '',
      amount: stockOpenBal
    });

    // 3️⃣ Purchases (glType = 202)
    const [purchaseAccounts] = await pool.query(
      "SELECT glNo, glSub FROM glAccount WHERE companyID = ? AND glType = '202' ORDER BY glNo, glSub",
      [companyID]
    );

    let purchaseTotal = 0;
    for (const acc of purchaseAccounts) {
      const [sumRows] = await pool.query(
        `SELECT SUM(drAmt - crAmt) AS sumBalance 
         FROM journal 
         WHERE companyID = ? AND glNo = ? AND glSub = ? 
         AND txnDate >= ? AND txnDate <= ?`,
        [companyID, acc.glNo, acc.glSub, startDate, endDate]
      );
      purchaseTotal += sumRows[0].sumBalance || 0;
    }

    cosData.push({
      addNo: 'Add :',
      glName: 'Purchases',
      totalText: '',
      amount: purchaseTotal
    });

    // 4️⃣ Labour & Other Costs (glType = 303, 204)
    const [labourAccounts] = await pool.query(
      "SELECT glNo, glSub, glName, glType FROM glAccount WHERE companyID = ? AND (glType = '303' OR glType = '204') ORDER BY glType, glNo, glSub",
      [companyID]
    );

    for (const acc of labourAccounts) {
      const [sumRows] = await pool.query(
        `SELECT SUM(drAmt - crAmt) AS sumBalance 
         FROM journal 
         WHERE companyID = ? AND glNo = ? AND glSub = ? 
         AND txnDate >= ? AND txnDate <= ?`,
        [companyID, acc.glNo, acc.glSub, startDate, endDate]
      );
      const amount = sumRows[0].sumBalance || 0;

      if (amount !== 0) {
        cosData.push({
          addNo: acc.glType === '204' ? 'Less :' : 'Add :',
          glName: acc.glName,
          totalText: '',
          amount: acc.glType === '204' ? Math.abs(amount) : amount
        });
      }
    }

    // 5️⃣ Closing Stock
    cosData.push({
      addNo: 'Less :',
      glName: 'Inventory Closing Balance',
      totalText: '',
      amount: stockCloseBal
    });

    res.json(cosData);

  } catch (error) {
    console.error('Error generating Cost of Sales:', error);
    res.status(500).send('Error generating Cost of Sales report');
  }
});

module.exports = router;