const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // mysql2/promise pool

router.post('/', async (req, res) => {
  const { companyID, employeeNo } = req.body;
console.log("DELETE BODY:", req.body);
  if (!companyID || !employeeNo) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let conn;
  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    const [txnRows] = await conn.execute(
      `SELECT * FROM employee WHERE companyID = ? AND employeeNo = ?`,
      [companyID, employeeNo.toUpperCase()]   // ❌ you had "row.employeeNo" which was undefined
    );

    if (txnRows.length === 0) {
      await conn.rollback();
      conn.release();
      return res.status(404).json({ error: 'Employee not found' });
    }

    await conn.execute(
      `DELETE FROM employee WHERE companyID = ? AND employeeNo = ?`,
      [companyID, employeeNo.toUpperCase()]
    );

    await conn.commit();
    conn.release();
    res.json({ message: 'Success' });

  } catch (err) {
    console.error('❌ Employee delete failed:', err);
    if (conn) await conn.rollback();
    if (conn) conn.release();
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

module.exports = router;