const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM foods_menu");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching menu:", err);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// Add a new menu item
router.post("/", async (req, res) => {
  try {
    const { name, price, category } = req.body;
    await db.query(
      "INSERT INTO foods_menu (name, price, category) VALUES (?, ?, ?)",
      [name, price, category]
    );
    res.json({ message: "Menu item added" });
  } catch (err) {
    console.error("❌ Error adding menu item:", err);
    res.status(500).json({ error: "Failed to add menu item" });
  }
});

module.exports = router;
