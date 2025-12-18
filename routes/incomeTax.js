const express = require('express');
const router = express.Router();
const pool = require('./dbDatabase'); // your MySQL pool

// 🔹 GET income tax records
router.get('/', async (req, res) => {
  const { companyID } = req.query;
  if (!companyID) return res.status(400).json({ error: 'companyID required' });

  try {
    const [rows] = await pool.query(
      'SELECT * FROM incomeTax WHERE companyID = ? ORDER BY category',
      [companyID]
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching income tax:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 🔹 DELETE income tax records for a company
router.delete('/', async (req, res) => {
  const { companyID } = req.query;
  if (!companyID) return res.status(400).json({ error: 'companyID required' });

  try {
    await pool.query('DELETE FROM incomeTax WHERE companyID = ?', [companyID]);
    console.log(`✅ Deleted incomeTax for companyID=${companyID}`);
    res.send('Success');
  } catch (err) {
    console.error('❌ Error deleting income tax:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 🔹 POST insert new income tax records
router.post('/', async (req, res) => {
  const data = req.body;
  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ error: 'No income tax data provided' });
  }

  const todaysDate = new Date();
  const year = todaysDate.getFullYear();

  try {
    // First delete old records
    const companyID = data[0].companyID;
    await pool.query('DELETE FROM incomeTax WHERE companyID = ?', [companyID]);

    // Insert new records
    for (const item of data) {
      const { companyID, category, incomeFrom, incomeTo, calFirst, calNext, rate, tax } = item;

      await pool.query(
        `INSERT INTO incomeTax 
          (companyID, category, incomeFrom, incomeTo, calFirst, calNext, rate, tax, year, date_created) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
        [companyID, category, incomeFrom, incomeTo, calFirst, calNext, rate, tax, year]
      );
    }

    console.log(`✅ Inserted ${data.length} incomeTax rows for companyID=${data[0].companyID}`);
    res.send('Success');
  } catch (err) {
    console.error('❌ Error inserting income tax:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
