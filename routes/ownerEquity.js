var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise'); // use promise version for async/await

router.get('/', async function (req, res) {
  const companyID = req.query.companyID;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: "+00:00",
    });

    console.log("SQL Connected!");

    // 1️⃣ Load GL Accounts for Owner Equity
    const [glAccounts] = await connection.query(
      `SELECT * FROM glAccount WHERE companyID = ? AND glType='701' ORDER BY glNo, glSub`,
      [companyID]
    );

    console.log(glAccounts);

    // 2️⃣ Loop through each GL Account and calculate balances
    for (let j = 0; j < glAccounts.length; j++) {
      let glNo = glAccounts[j].glNo;
      let glSub = glAccounts[j].glSub;
      let opBalance = glAccounts[j].opBalance || 0;

      glAccounts[j].debit = 0;
      glAccounts[j].credit = 0;

      console.log(`${glNo} - ${glSub} : O/P Balance = ${opBalance}`);

      // 2.1 Get sumBalance before startDate
      const [sumResult] = await connection.query(
        `SELECT SUM(drAmt - crAmt) AS sumBalance 
         FROM journal 
         WHERE companyID=? AND glNo=? AND glSub=? AND txnDate<?`,
        [companyID, glNo, glSub, startDate]
      );

      let sumBalance = sumResult[0].sumBalance || 0;
      let curBalance = opBalance + sumBalance;

      // 2.2 Get transactions within date range
      const [txnResults] = await connection.query(
        `SELECT * FROM journal 
         WHERE companyID=? AND glNo=? AND glSub=? 
         AND txnDate>=? AND txnDate<=? 
         ORDER BY txnDate, voucherNo ASC`,
        [companyID, glNo, glSub, startDate, endDate]
      );

      let drAmount = 0;
      let crAmount = 0;

      if (txnResults.length > 0) {
        for (let txn of txnResults) {
          drAmount += txn.drAmt || 0;
          crAmount += Math.abs(txn.crAmt || 0);
        }
      }

      // 2.3 Final balance calculation
      let finBalance = opBalance + sumBalance + drAmount - crAmount;

      if (finBalance > 0) {
        glAccounts[j].debit = finBalance;
        glAccounts[j].credit = 0;
      } else {
        glAccounts[j].credit = finBalance;
        glAccounts[j].debit = 0;
      }
    }

    // 3️⃣ Send final results
    console.log(glAccounts);
    res.send(glAccounts);

  } catch (err) {
    console.error("Error in ownerEquity route:", err);
    res.status(500).send({ error: "Internal Server Error" });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;