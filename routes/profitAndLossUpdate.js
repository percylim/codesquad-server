const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // using the pool

router.post('/', async (req, res) => {
  try {
    const TBData = req.body;
    if (!TBData || !TBData.length) {
      return res.status(400).send("No data received");
    }

    const companyID = TBData[0].companyID;
    const eDate = new Date(TBData[0].endDate);
    const year = eDate.getFullYear();

    console.log("Saving P&L for company:", companyID, "year:", year);

    for (const row of TBData) {
      const sql = `
        INSERT INTO profitAndLoss 
        (companyID, year, startDate, endDate, addNo, glName, totalText, amount, PNLType, date_close, date_created) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), CURDATE())
      `;

      await db.execute(sql, [
        companyID,
        year,
        row.startDate,
        row.endDate,
        row.addNo,
        row.glName,
        row.totalText,
        row.amount,
        row.PNLType
      ]);
    }

    res.send({ message: "Profit And Loss Statement Saved" });

  } catch (err) {
    console.error("Error inserting P&L:", err);
    res.status(500).send("Failed to save P&L");
  }
});

module.exports = router;