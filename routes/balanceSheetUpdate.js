var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

router.post("/", function(req, res, next) {
  var BSData = req.body;
  if (!Array.isArray(BSData) || BSData.length === 0) {
    return res.status(400).send("Invalid Balance Sheet data");
  }

  var companyID = BSData[0].companyID;
  var eDate = new Date(BSData[0].endDate);
  var year = eDate.getFullYear();

  console.log(BSData);
  console.log(year);

  var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "+00:00",
  });

  con.connect(function(err) {
    if (err) {
      console.error("Error connecting to database:", err);
      return res.status(500).send("Database connection failed");
    }
    console.log("SQL Connected!");
  });

  var sql = `
    INSERT INTO balanceSheet
    (companyID, year, startDate, endDate, addNo, glName, totalText, amount, PNLType, date_close, date_created)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), CURDATE())
  `;

  var errors = [];
  var completed = 0;

  BSData.forEach(function(item) {
    var params = [
      companyID,
      year,
      item.startDate,
      item.endDate,
      item.addNo,
      item.glName,
      item.totalText,
      item.amount,
      item.PNLType
    ];

    console.log(sql, params);

    con.query(sql, params, function(err) {
      completed++;
      if (err) {
        console.error("Error inserting balance sheet row:", err);
        errors.push(err);
      } else {
        console.log("Balance Sheet row inserted");
      }

      // Close connection and respond when all queries are done
      if (completed === BSData.length) {
        con.end();
        if (errors.length > 0) {
          return res.status(500).send("Some rows failed to insert");
        } else {
          return res.send("Balance Sheet Saved");
        }
      }
    });
  });
});

module.exports = router;
