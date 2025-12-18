// routes/closingStock.js
const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // MySQL pool

// GET - Calculate closing stock
router.get('/', async (req, res) => {
  try {
    const { companyID, startDate, endDate } = req.query;
    if (!companyID || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters");
    }

    let stockCloseBal = 0;

    // 1. Get opening stock GL balance (glType 804)
    const [glRows] = await db.execute(
      `SELECT opBalance 
       FROM glAccount 
       WHERE companyID = ? AND glType = '804'`,
      [companyID]
    );
    if (glRows.length > 0) {
      stockCloseBal = glRows[0].opBalance || 0;
    }

    // 2. Get all products for the company
    const [products] = await db.execute(
      `SELECT productID, productName, cost 
       FROM product 
       WHERE companyID = ?`,
      [companyID]
    );

    // 3. For each product, add its opening & period transactions to stockCloseBal
    for (const product of products) {
      // Before start date
      const [beforeRows] = await db.execute(
        `SELECT SUM((txnQtyIn - txnQtyOut) * unitPrice) AS sumBalance
         FROM productTxn
         WHERE companyID = ?
           AND productID = ?
           AND txnDate < ?`,
        [companyID, product.productID, startDate]
      );
      if (beforeRows.length && beforeRows[0].sumBalance !== null) {
        stockCloseBal += beforeRows[0].sumBalance;
      }

      // In date range
      const [rangeRows] = await db.execute(
        `SELECT SUM((txnQtyIn - txnQtyOut) * unitPrice) AS sumCurBalance
         FROM productTxn
         WHERE companyID = ?
           AND productID = ?
           AND txnDate >= ? 
           AND txnDate <= ?`,
        [companyID, product.productID, startDate, endDate]
      );
      if (rangeRows.length && rangeRows[0].sumCurBalance !== null) {
        stockCloseBal += rangeRows[0].sumCurBalance;
      }
    }

    // 4. Send result
    res.json([{
      addNo: '',
      glName: 'Inventory Closing Balance',
      totalText: '',
      amount: stockCloseBal
    }]);

  } catch (err) {
    console.error("Error in closingStock route:", err);
    res.status(500).send("Failed to load closing stock");
  }
});

// POST - Save closing stock to GL
router.post('/', async (req, res) => {
  try {
    const { companyID, stockCloseBal } = req.body;
    if (!companyID || stockCloseBal === undefined) {
      return res.status(400).send("Missing required parameters");
    }

    // 1. Remove old closing stock entries (glType 999)
    await db.execute(
      `DELETE FROM glAccount 
       WHERE companyID = ? AND glType = '999'`,
      [companyID]
    );

    // 2. Insert new closing stock record
    await db.execute(
      `INSERT INTO glAccount 
       (companyID, glNo, glSub, glType, department, glName, glDescription, glAmount)
       VALUES (?, '9999', '999', '999', '999', 'Inventory Closing Balance', '', ?)`,
      [companyID, stockCloseBal]
    );

    // 3. Send confirmation
    res.json([{
      addNo: '',
      glName: 'Inventory Closing Balance',
      totalText: '',
      amount: stockCloseBal
    }]);

  } catch (err) {
    console.error("Error saving closing stock:", err);
    res.status(500).send("Failed to save closing stock");
  }
});

module.exports = router;
