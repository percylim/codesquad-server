
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const moment = require('moment');

router.get("/", async function(req, res) {
    let connection;
    try {
        const { companyID, startDate, endDate, productID } = req.query;

        // Validate required parameters
        if (!companyID || !startDate || !endDate || !productID) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone: "+00:00",
        });

        // 1. Get product opening balance
        const [productResults] = await connection.execute(
            'SELECT * FROM product WHERE companyID = ? AND productID = ?',
            [companyID, productID]
        );

        if (productResults.length === 0) {
            return res.status(404).json({ error: `No records exist with ProductID ${productID}` });
        }

        const opBalance = productResults[0].opBalance;
        console.log("O/P Balance = " + opBalance);

        // 2. Calculate sum balance before start date
        const [sumResults] = await connection.execute(
            'SELECT SUM(TxnQtyIn - txnQtyOut) AS sumBalance FROM productTxn ' +
            'WHERE companyID = ? AND productID = ? AND txnDate < ?',
            [companyID, productID, startDate]
        );

        let sumBalance = sumResults[0].sumBalance || 0;
        let curBalance = opBalance + sumBalance;

        console.log("sumBalance: " + sumBalance);
        console.log("opBalance: " + opBalance);

        // 3. Get transactions in date range
        const [txnResults] = await connection.execute(
            'SELECT * FROM productTxn ' +
            'WHERE companyID = ? AND productID = ? AND txnDate >= ? AND txnDate <= ? ' +
            'ORDER BY txnDate, voucherNo ASC',
            [companyID, productID, startDate, endDate]
        );

        if (txnResults.length === 0) {
            return res.status(404).json({
                error: `No records between ${startDate} and ${endDate}`,
                openingBalance: curBalance
            });
        }

        // Calculate running balances
        txnResults.forEach((txn, i) => {
            if (i === 0) {
                txn.opBal = curBalance;
                txn.curBal = curBalance + txn.txnQtyIn - txn.txnQtyOut;
            } else {
                txn.opBal = 0;
                txn.curBal = txnResults[i-1].curBal + txn.txnQtyIn - txn.txnQtyOut;
            }
            curBalance = txn.curBal;
        });

        console.log(txnResults);
        res.json(txnResults);

    } catch (err) {
        console.error('Error in productReportSearch:', err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) await connection.end();
    }
});

module.exports = router;
