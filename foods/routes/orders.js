const express = require("express");
const router = express.Router();
const db = require("../db");

// Place an order
router.post("/", async (req, res) => {
  try {
    const { customer_name, items } = req.body;
    const [result] = await db.query(
      "INSERT INTO food_orders (customer_name) VALUES (?)",
      [customer_name]
    );
    const orderId = result.insertId;

    // Insert order items
    for (const item of items) {
      await db.query(
        "INSERT INTO food_order_items (order_id, food_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.food_id, item.quantity]
      );
    }

    res.json({ message: "Order placed", orderId });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM food_orders");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
