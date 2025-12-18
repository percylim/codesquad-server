 const express = require('express');
const router = express.Router();
const db = require('./dbDatabase');

router.get("/", async (req, res, next) => {
    try {
        const { companyID, year } = req.query;

        if (!companyID || !year) {
            return res.status(400).send("Missing required parameters");
        }

        const [balanceSheet] = await db.execute(
            `SELECT * FROM balanceSheet 
             WHERE companyID = ? AND year = ?`,
            [companyID, year]
        );

        if (balanceSheet.length === 0) {
            return res.status(404).send("No balance sheet available");
        }

        console.log('Yearly Balance Sheet Load successfully');
        console.log(balanceSheet);
        return res.json(balanceSheet);

    } catch (err) {
        console.error("Error loading yearly balance sheet:", err);
        res.status(500).send("Failed to load yearly balance sheet");
    }
});

module.exports = router;
