const db = require("../db");

// ✅ Get all foods
exports.getMenu = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM foods ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("❌ DB Error (getMenu):", err);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};

// ✅ Add new food
exports.addFood = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    await db.query("INSERT INTO foods (name, price) VALUES (?, ?)", [name, price]);
    res.json({ success: true, message: "Food added" });
  } catch (err) {
    console.error("❌ DB Error (addFood):", err);
    res.status(500).json({ error: "Failed to add food" });
  }
};

