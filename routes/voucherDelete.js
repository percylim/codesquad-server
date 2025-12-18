const express = require('express');
const router = express.Router();
const db = require('./dbDatabase'); // mysql2/promise pool

router.post('/', async (req, res) => {
  const { companyID, userName, voucherNo } = req.body;

  if (!companyID || !userName || !voucherNo) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let conn;
  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    // 1. Get all journal entries for this voucher
    const [jvData] = await conn.execute(
      `SELECT * FROM journal WHERE companyID = ? AND voucherNo = ?`,
      [companyID, voucherNo.toUpperCase()]
    );

    if (jvData.length === 0) {
      await conn.release();
      return res.status(404).json({ error: 'Voucher not found' });
    }

    // 2. Process each journal row
    for (let row of jvData) {
      const txnDate = row.txnDate.toISOString().slice(0, 10);
      const glAmount = row.drAmt - row.crAmt;

      // Insert into journalChange
      await conn.execute(
        `INSERT INTO journalChange 
          (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, 
           drAmt, crAmt, userName, txnDate, voucherType, userChange, dateChange, status, reasons) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'JV', ?, CURDATE(), 'JV', 'Voucher Deleted')`,
        [
          companyID, row.glNo, row.glSub, row.department, row.glName,
          row.jeParticular, row.voucherNo, row.drAmt, row.crAmt,
          row.userName, txnDate, userName
        ]
      );

      // Reverse glAccount balance
      await conn.execute(
        `UPDATE glAccount 
           SET glAmount = glAmount - ? 
         WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ?`,
        [glAmount, companyID, row.glNo, row.glSub, row.department]
      );

      // Update glTxn (same day)
      const [txnRows] = await conn.execute(
        `SELECT * FROM glTxn 
          WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ? AND txnDate = ?`,
        [companyID, row.glNo, row.glSub, row.department, txnDate]
      );

      if (txnRows.length > 0) {
        await conn.execute(
          `UPDATE glTxn 
             SET txnAmount = txnAmount - ? 
           WHERE companyID = ? AND glNo = ? AND glSub = ? AND department = ? AND txnDate = ?`,
          [glAmount, companyID, row.glNo, row.glSub, row.department, txnDate]
        );
      }
    }

    // 3. Delete all journal entries for the voucher (once per voucher, not per row)
    await conn.execute(
      `DELETE FROM journal WHERE companyID = ? AND voucherNo = ?`,
      [companyID, voucherNo.toUpperCase()]
    );

    await conn.commit();
    conn.release();
    res.json({ message: 'Voucher deleted successfully' });

  } catch (err) {
    console.error('❌ Voucher delete failed:', err);
    if (conn) await conn.rollback();
    if (conn) conn.release();
    res.status(500).json({ error: 'Failed to delete voucher' });
  }
});

module.exports = router;
