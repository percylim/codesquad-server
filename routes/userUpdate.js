const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // mysql2/promise pool
const md5 = require('md5');

router.post('/', async (req, res) => {
  const { companyID, employeeNo, employeeName, nric, sex, password } = req.body;

  // ✅ Validate inputs
  if (!companyID || !employeeNo || !employeeName || !nric || !sex || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // ✅ Hash password same as adminLogin.js
  const md5Password = md5(password.trim() + employeeName.trim() + companyID.trim());

  let conn;
  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    // ✅ Check if employee already exists
    const [existing] = await conn.execute(
      `SELECT employeeNo FROM employee WHERE companyID = ? AND employeeNo = ?`,
      [companyID, employeeNo]
    );

    const userLevel = 1; // default level

    if (existing.length > 0) {
      // ✅ Update existing user
      const [result] = await conn.execute(
        `UPDATE employee
         SET employeeName = ?, nric = ?, sex = ?, password = ?, \`level\` = ?
         WHERE companyID = ? AND employeeNo = ?`,
        [employeeName, nric, sex, md5Password, userLevel, companyID, employeeNo]
      );

      console.log("✅ User updated. Rows affected:", result.affectedRows);
    } else {
      // ✅ Insert new user
      await conn.execute(
        `INSERT INTO employee (companyID, employeeNo, employeeName, nric, sex, \`level\`, password)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [companyID, employeeNo, employeeName, nric, sex, userLevel, md5Password]
      );

      console.log("✅ New user inserted:", employeeNo);
    }

    await conn.commit();
    res.json({ success: true, message: 'User saved successfully' });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("❌ Error saving employee:", err);
    res.status(500).json({ error: 'Failed to save employee' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
