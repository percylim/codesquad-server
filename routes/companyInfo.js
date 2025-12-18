var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var moment = require('moment');

router.get("/", function(req, res) {
    const companyID = req.query.companyID;
    console.log("🔍 Requested CompanyID:", companyID);

    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        timezone : "+00:00",
    });

    const sql = "SELECT * FROM company WHERE companyID = ?";
    console.log("📄 SQL:", sql);

    db.query(sql, [companyID], function (err, results) {
        db.end(); // ✅ always close DB regardless of error

        if (err) {
            console.error('❌ Company Info DB Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        console.log('✅ Company Info fetched successfully');
        console.log(results);
        res.json(results); // ✅ Use JSON response for arrays
    });
});

module.exports = router;
