var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');

//const db = mysql.createConnection({
//    host: process.env.DB_HOST,
//    user: 'root',
//    password: process.env.DB_PASSWORD,
//    database: 'codesquaddb',
//    timezone: "+00:00",
//  }); // adjust path if needed
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'codesquaddb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
router.get("/", async function (req, res) {
  try {
  //  const { companyID } = req.query;
  //  if (!companyID) {
  //    return res.status(400).json({ error: "Missing companyID" });
  //  }

    const sql = "SELECT * FROM glAccount ORDER BY glNo";
    const [results] = await db.query(sql);

    console.log("✅ General Ledger fetched successfully");
    res.json(results);
  } catch (err) {
    console.error("❌ GL List DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
