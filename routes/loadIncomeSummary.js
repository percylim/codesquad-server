const express = require('express');
const router = express.Router();
const db = require('./dbDatabase');

router.get('/', async (req, res) => {
    try {
        const { companyID, year } = req.query;

        if (!companyID || !year) {
            return res.status(400).send("Missing required parameters");
        }

        const [incomeSummary] = await db.execute(
            `SELECT * FROM incomeSummary 
             WHERE companyID = ? AND year = ?`,
            [companyID, year]
        );

        if (incomeSummary.length === 0) {
            return res.status(404).send("No income summary available");
        }

        console.log('Income Summary loaded successfully');
        console.log(incomeSummary);
        return res.json(incomeSummary);

    } catch (err) {
        console.error("Error loading income summary:", err);
        res.status(500).send("Failed to load income summary");
    }
});

module.exports = router;