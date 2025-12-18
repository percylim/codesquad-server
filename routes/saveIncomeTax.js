 var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

router.post("/", function(req, res) {
  var data = req.body;
  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  let successCount = 0;
  let hasError = false;
console.log("✅ saveIncomeTax API called");
  if (!data || data.length === 0) {
    return res.status(400).send("No data received.");
  }

  let companyID = data[0].companyID;

  var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "+00:00",
  });

  // First, delete existing records for the company/year
  let deleteQuery = "DELETE FROM incomeTax WHERE companyID = ? AND year = ?";
  db.query(deleteQuery, [companyID, year], function(deleteErr) {
    if (deleteErr) {
      console.error("❌ Delete failed:", deleteErr);
      db.end();
      return res.status(500).send("Failed to delete old records.");
    }

    console.log(`✅ Existing records for ${companyID} year ${year} deleted.`);

    // Now insert new records
    for (let i = 0; i < data.length; i++) {
      let {
        category,
        incomeFrom,
        incomeTo,
        calFirst,
        calNext,
        rate,
        tax,
        nextTax
      } = data[i];

      let insertQuery = `INSERT INTO incomeTax 
        (companyID, category, incomeFrom, incomeTo, calFirst, calNext, rate, tax, nextTax, year, date_created)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`;

      let params = [
        companyID, category, incomeFrom, incomeTo, calFirst, calNext,
        rate, tax, nextTax, year
      ];

      db.query(insertQuery, params, function(err) {
        if (err) {
          console.error("❌ Insert failed:", err);
          if (!hasError) {
            hasError = true;
            db.end();
            return res.status(500).send("Insert failed: " + err.message);
          }
        } else {
          successCount++;
          if (successCount === data.length && !hasError) {
            db.end();
            return res.send("Success");
          }
        }
      });
    }
  });
});

module.exports = router;
