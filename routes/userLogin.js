const express = require('express');
const router = express.Router();
const md5 = require('md5');
const db = require('./dbDatabase'); // mysql2/promise pool

router.post("/", async (req, res) => {
  try {
    const { companyID, employeeNo, password } = req.body;

    // 🔎 Validate inputs
    if (!employeeNo || !companyID || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🔎 Fetch employee record
    const [rows] = await db.execute(
      "SELECT * FROM employee WHERE employeeNo = ? AND companyID = ?",
      [employeeNo.trim(), companyID.trim()]
    );

    if (rows.length === 0) {
      console.log("❌ Login failed: user not found");
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const employee = rows[0];
    const employeeName = employee.employeeName?.trim() || "";

    // 🔐 Hash password with same rule as userUpdate.js
    const md5Password = md5(password.trim() + employeeName + companyID.trim());

    if (md5Password === employee.password) {
      console.log("✅ Login success:", employeeNo);
      // return only safe fields (not password)
      return res.json({
        employeeNo: employee.employeeNo,
        employeeName: employee.employeeName,
        companyID: employee.companyID,
        level: employee.level
      });
    } else {
      console.log("❌ Login failed: wrong password");
      return res.status(401).json({ error: "Invalid login credentials" });
    }
  } catch (err) {
    console.error("❌ Error in userLogin:", err);
    res.status(500).json({ error: "Login failed due to server error" });
  }
});

module.exports = router;
