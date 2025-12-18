const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const md5 = require("md5");

router.post("/", async (req, res) => {
  const { companyID, adminName, password } = req.body;

  if (!companyID || !adminName || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const md5Password = md5(password.trim() + adminName.trim() + companyID.trim());

  let con;
  try {
    // 🔑 Force connection to codesquaddb only
    con = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: "root",
      password: process.env.DB_PASSWORD || "",
      database: "codesquaddb",   // ✅ hardcoded here
      timezone: "+00:00",
    });

    const sql = `SELECT * FROM admin WHERE adminName = ? AND companyID = ? AND password = ?`;
    const values = [adminName.trim(), companyID.trim(), md5Password];

    const [results] = await con.execute(sql, values);

    if (results.length > 0) {
      console.log("✅ Admin login success:", results[0].adminName);
      return res.json(results[0]);  // send one row
    } else {
      console.log("❌ Admin login failed: invalid credentials");
      return res.status(401).json({ error: "Invalid login credentials" });
    }
  } catch (err) {
    console.error("❌ Database error:", err.message);
    return res.status(500).json({ error: "Database query failed: " + err.message });
  } finally {
    if (con) await con.end();
  }
});

module.exports = router;
