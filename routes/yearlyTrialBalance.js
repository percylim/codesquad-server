const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // use shared pool

router.get("/", async (req, res) => {
    try {
        const { companyID, year } = req.query;

        if (!companyID || !year) {
            return res.status(400).send("Missing required parameters");
        }

        const [trialBalance] = await db.execute(
            `SELECT * FROM trialBalance 
             WHERE companyID = ? AND year = ?`,
            [companyID, year]
        );

        if (trialBalance.length === 0) {
            return res.status(404).send("No yearly trial balance available");
        }

        console.log('Yearly Trial Balance loaded successfully');
        console.log(trialBalance);

        return res.json(trialBalance);

      } catch (err) {
    console.error("Error in ownerEquity route:", err);
    res.status(500).send({ error: "Internal Server Error" });
  } 

});
module.exports = router;
