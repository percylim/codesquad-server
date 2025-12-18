// foods/mobileOrder.js
const express = require("express");
const router = express.Router();
const pool = require("./db"); // your mysql2/promise pool connection

// GET /api/mobile/categories?stallID=...
router.get("/categories", async (req, res) => {
  const { stallID } = req.query;

  if (!stallID) return res.status(400).json({ error: "stallID is required" });

  try {
    const [categories] = await pool.query(
      "SELECT * FROM category WHERE stallID = ? ORDER BY categoryName ASC",
      [stallID]
    );
    res.json({ success: true, categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/mobile/foods?stallID=...
router.get("/foods", async (req, res) => {
  const { stallID } = req.query;

  if (!stallID) return res.status(400).json({ error: "stallID is required" });

  try {
    const [foods] = await pool.query(
      "SELECT * FROM foods WHERE stallID = ? ORDER BY foodName ASC",
      [stallID]
    );
    res.json({ success: true, foods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/mobile/addons?stallID=...
router.get("/addons", async (req, res) => {
  const { stallID } = req.query;

  if (!stallID) return res.status(400).json({ error: "stallID is required" });

  try {
    const [addons] = await pool.query(
      "SELECT * FROM addons WHERE stallID = ? ORDER BY addonName ASC",
      [stallID]
    );
    res.json({ success: true, addons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
