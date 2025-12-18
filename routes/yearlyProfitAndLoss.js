const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // shared MySQL pool

router.get("/", async (req, res) => {
    try {
        const { companyID, year } = req.query;

        if (!companyID || !year) {
            return res.status(400).send("Missing required parameters");
        }

        const [profitAndLoss] = await db.execute(
            `SELECT * 
             FROM profitAndLoss 
             WHERE companyID = ? AND year = ?`,
            [companyID, year]
        );

        if (profitAndLoss.length === 0) {
            console.log("No profit and loss data available");
            return res.send(profitAndLoss);
        }

        console.log('Yearly Profit And Loss loaded successfully');
        console.log(profitAndLoss);

        return res.json(profitAndLoss);

    } catch (err) {
        console.error("Error loading yearly profit and loss:", err);
        res.status(500).send("Failed to load yearly profit and loss");
    }
});

module.exports = router;
