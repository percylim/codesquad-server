var express = require('express');
var router = express.Router();
var alert = require('alert');
var env = process.env;
var mysql = require('mysql2');
//var db = require('./dbDatabase');
var md5 = require('md5');
var qresult = "";
var msg = "";
var bodyParser = require('body-parser');
var db;


router.post('/', function (req, res) {
  const {
    companyID, companyName, address1, address2,
    postcode, city, state, country,
    adminID, adminName, email, phone, password
  } = req.body;

  const md5Password = md5(password + adminName + companyID);
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'codesquaddb',
    timezone: "+00:00",
  });

  db.connect((err) => {
    if (err) {
      console.error("DB connection failed:", err);
      return res.status(500).json({ error: "DB connection failed" });
    }
    console.log("Connected to DB");
  });

  // Check if company exists
  db.query("SELECT * FROM companyCTRL WHERE companyID = ?", [companyID], (err, rows) => {
    if (err) {
      console.error("Company check error:", err);
      return res.status(500).json({ error: "Company query failed" });
    }

    if (rows.length > 0) {
      return res.status(409).json({ error: "Company already exists" });
    }

    // Insert company
    const insertCompanySQL = `
      INSERT INTO companyCTRL (companyID, companyName, address1, address2, postcode, city, state, country, email, phone, databaseName, date_created)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())
    `;
    const companyValues = [companyID, companyName, address1, address2, postcode, city, state, country, email, phone, companyID];

    db.query(insertCompanySQL, companyValues, (err) => {
      if (err) {
        console.error("Company insert error:", err);
        return res.status(500).json({ error: "Company insert failed" });
      }

      // Check if admin exists
      db.query("SELECT * FROM admin WHERE companyID = ? AND adminID = ?", [companyID, adminID], (err, rows) => {
        if (err) {
          console.error("Admin check error:", err);
          return res.status(500).json({ error: "Admin query failed" });
        }

        if (rows.length > 0) {
          return res.status(409).json({ error: "Admin already exists" });
        }

        // Insert admin
        const insertAdminSQL = `
          INSERT INTO admin (companyID, adminID, adminName, email, phone, password, companyName, date_create)
          VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())
        `;
        const adminValues = [companyID, adminID, adminName, email, phone, md5Password, companyName];

        db.query(insertAdminSQL, adminValues, (err) => {
          if (err) {
            console.error("Admin insert error:", err);
            return res.status(500).json({ error: "Admin insert failed" });
          }

          console.log("✅ Company & Admin created successfully");
          return res.status(200).json({ message: "Company and Admin registered successfully" });
        });
      });
    });
  });
});
//app.use("/", router);

module.exports = router;
