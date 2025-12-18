const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const md5 = require("md5");

router.post("/", async (req, res) => {
  const { companyID, adminName, password } = req.body;

  if (!companyID || !adminName || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const md5Password = md5(password.trim() + adminName.trim() + companyID.trim());
  console.log("Incoming login:", { companyID, adminName, md5Password });

  try {
    const con = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: "root",
      password: process.env.DB_PASSWORD || "",
      database: "codesquaddb",   // ✅ force correct DB
      timezone: "+00:00",
    });

    // ✅ Select only existing columns (no `level`)
    const [results] = await con.execute(
      "SELECT adminName, companyID, companyName FROM admin WHERE adminName = ? AND companyID = ? AND password = ?",
      [adminName.trim(), companyID.trim(), md5Password]
    );

    await con.end();

    if (results.length > 0) {
      console.log("✅ Admin login success:", results[0]);
      return res.json(results[0].companyName); // send only one row
    } else {
      console.log("❌ Invalid login credentials");
      return res.status(401).json({ error: "Invalid login credentials" });
    }
  } catch (err) {
    console.error("❌ DB error in adminLogin:", err.message, err.stack);
    return res.status(500).json({ error: "Database query failed", details: err.message });
  }
});

module.exports = router;
