const express = require("express");
const router = express.Router();
const moment = require("moment");
const pool = require("./dbDatabase"); // ✅ your pool

router.post("/", async (req, res) => {
  const voucherData = req.body;

  if (!Array.isArray(voucherData) || voucherData.length === 0) {
    return res.status(400).json({ success: false, message: "No voucher data provided" });
  }

  const { companyID, userName, voucherNo, bankID } = voucherData[0];
  if (!companyID || !userName || !voucherNo || !bankID) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const vNo = voucherNo.toUpperCase();

  // Normalize dates + amounts
  voucherData.forEach(v => {
    v.txnDate = moment(v.txnDate, "DD/MM/YYYY").format("YYYY-MM-DD");
    v.drAmt = parseFloat((v.drAmt || "0").replace(/,/g, "")) || 0;
    v.crAmt = parseFloat((v.crAmt || "0").replace(/,/g, "")) || 0;
  });

  let conn;
  try {
    conn = await pool.getConnection(); // ✅ borrow from pool
    await conn.beginTransaction();

    // 1️⃣ check bank account
    const [bankRows] = await conn.query(
      "SELECT * FROM bankAcct WHERE companyID=? AND bankID=?",
      [companyID, bankID]
    );
    if (bankRows.length === 0) {
      await conn.rollback();
      return res.status(400).json({ success: false, message: `Bank ID ${bankID} is invalid` });
    }

    // 2️⃣ check voucher number
    const [journalRows] = await conn.query(
      "SELECT * FROM journal WHERE companyID=? AND voucherNo=?",
      [companyID, vNo]
    );
    if (journalRows.length > 0) {
      await conn.rollback();
      return res.status(400).json({ success: false, message: `Voucher No. ${vNo} already exists` });
    }

    // 3️⃣ insert journal entries
    for (let v of voucherData) {
      await conn.query(
        `INSERT INTO journal 
          (companyID, glNo, glSub, department, glName, jeParticular, voucherNo, drAmt, crAmt, userName, txnDate, voucherType) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'JV')`,
        [
          companyID,
          v.glNo,
          v.glSub,
          v.department,
          v.glName,
          v.jeParticular,
          vNo,
          v.drAmt,
          v.crAmt,
          userName,
          v.txnDate,
        ]
      );
    }

    // 4️⃣ update GL account balances
    for (let v of voucherData) {
      const glAmount = v.drAmt - v.crAmt;
      await conn.query(
        `UPDATE glAccount 
         SET glAmount = glAmount + ? 
         WHERE companyID=? AND glNo=? AND glSub=? AND department=?`,
        [glAmount, companyID, v.glNo, v.glSub, v.department]
      );
    }

    // 5️⃣ TODO: insert into bankTxn or update bankAcct if needed

    await conn.commit();
    res.json({ success: true, message: "Bank transaction posted successfully" });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("Bank transaction error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (conn) conn.release(); // ✅ release back to pool
  }
});

module.exports = router;
