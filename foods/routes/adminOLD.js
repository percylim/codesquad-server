// foods/admin.js
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("./db"); // make sure db.js exists in parent folder
const multer = require("multer");
const path = require("path");
const QRCode = require("qrcode");
const os = require("os");
const Jimp = require("jimp");
const fs = require("fs");
const PDFDocument = require("pdfkit");

//const qrOrderRouter = require('./qrOrder');
const qrcodeController = require('../controllers/qrcodeController');

router.get('/api/qrcode', qrcodeController.getQRCode);

// Use the QR orders router
router.get("/generateQR", async (req, res) => {
  try {
    const text = req.query.text || "http://localhost:3000"; // any URL or text
    const logoPath = path.join(__dirname, "../uploads/mummy-logo.jpg");
    const outputPath = path.join(__dirname, "../uploads/qr_with_logo.png");

    // Step 1: Generate QR code buffer
    const qrBuffer = await QRCode.toBuffer(text, {
      errorCorrectionLevel: "H",
      width: 400,
    });

    // Step 2: Read QR + logo
    const qrImage = await Jimp.read(qrBuffer);
    const logo = await Jimp.read(logoPath);

    // Step 3: Resize logo (20% of QR size)
    const logoSize = qrImage.bitmap.width * 0.2;
    logo.resize(logoSize, logoSize);

    // Step 4: Center logo
    const x = (qrImage.bitmap.width - logoSize) / 2;
    const y = (qrImage.bitmap.height - logoSize) / 2;
    qrImage.composite(logo, x, y);

    // Step 5: Save final image
    await qrImage.writeAsync(outputPath);

    // Step 6: Respond with image URL or file
    res.sendFile(outputPath);
  } catch (err) {
    console.error("❌ QR generation failed:", err);
    res.status(500).json({ success: false, message: "QR generation failed" });
  }
});
// update existing admin
router.put("/updateAdmin", async (req, res) => {
  const db = await pool.getConnection();
  try {
    const { stallID, stallName, password, confirmPassword } = req.body;
    console.log("PUT Admin:", req.body);

    if (!stallID || !stallName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Password and Confirm Password NOT MATCH" });
    }

    const [existing] = await db.query("SELECT * FROM admins WHERE stallID = ?", [stallID]);
    if (existing.length === 0) {
      return res.json({ success: false, message: "Stall ID NOT EXISTED" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "UPDATE admins SET userName = ?, password = ? WHERE stallID = ?",
      [stallName, hashedPassword, stallID]
    );

    res.json({ success: true, message: "Admin updated successfully" });
  } catch (err) {
    console.error("❌ Update admin error:", err);
    res.status(500).json({ success: false, message: "DB error" });
  } finally {
    db.release();
  }
});
// ====================================================
// 🖼️ Upload Stall Logo
// ====================================================
// ✅ Correct logo upload storage
// Storage for food uploads
// ✅ Create uploads directory if it doesn't exist
//const UPLOADS_DIR = path.join(__dirname, "..", "foods", "uploads");
// Configure multer for file uploads
// --- upload config ---
const UPLOAD_DIR = path.join(__dirname, "..", "foods", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // temporarily save as unknown first
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `unknown-logo${ext}`);
  },
});

const upload = multer({ storage });

// --- route handler ---
router.post("/uploadLogo", upload.single("file"), async (req, res) => {
  try {
    const stallID = String(req.body?.stallID || "").trim();
    if (!stallID || !req.file) {
      return res.json({ success: false, message: "Missing stallID or file" });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const newFilename = `${stallID}-logo${ext}`;
    const newPath = path.join(UPLOAD_DIR, newFilename);

    // rename from temporary unknown to stall-specific name
    fs.renameSync(req.file.path, newPath);

    console.log(`✅ Uploaded and renamed to: ${newFilename}`);
    res.json({ success: true, imageUrl: `/foods/uploads/${newFilename}` });
  } catch (err) {
    console.error("❌ Upload logo error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// 🔹 Register a new admin/stall
router.post("/register", async (req, res) => {
  const { stallID, stallName, password, confirmPassword } = req.body;
const db = await pool.getConnection();
  console.log(req.body);
  if (!stallID || !stallName || !password || !confirmPassword) {
    return res.json({ success: false, message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.json({ success: false, message: "Passwords do not match" });
  }

  try {
    // Check if stallID already exists
    const [existing] = await db.query("SELECT * FROM admins WHERE stallID = ?", [stallID]);
    if (existing.length > 0) {
      return res.json({ success: false, message: "Stall ID already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into admins table
    await db.query(
      "INSERT INTO admins (stallID, username, password) VALUES (?, ?, ?)",
      [stallID, stallName, hashedPassword]
    );

    res.json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error("Register error:", err);
    res.json({ success: false, message: "Server error" });
  }
});

// 🔹 Admin login

router.post("/login", async (req, res) => {
  const db = await pool.getConnection();  // ✅ REQUIRED
  const { adminID, password } = req.body;
  console.log("📤 Login request:", req.body);

  if (!adminID || !password) {
    return res.json({ success: false, message: "Stall ID and password required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM admins WHERE stallID = ?", [adminID]);
    console.log("💾 DB result:", rows);

    if (!rows || rows.length === 0) {
      console.log("❌ Stall not found");
      return res.json({ success: false, message: "Admin not found" });
    }

    const admin = rows[0];
    console.log("🔑 Admin record:", admin);

    // ❗ TEMPORARY — your DB stores unhashed password
    if (admin.password !== password) {
      console.log("❌ Password mismatch");
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({ success: true, message: "Login OK" });

  } catch (err) {
    console.error("❌ Login route error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    db.release();   // ✅ ALSO REQUIRED
  }
});



/*
router.post('/login', async (req, res) => {
  try {
    const { adminID, password } = req.body;

    // your existing login logic
    const result = await db.query('SELECT * FROM admins WHERE adminID=?', [adminID]);
    if (!result.length) {
      return res.json({ success: false, message: 'Admin not found' });
    }

    // password check logic here...

    res.json({ success: true, username: result[0].username, stallID: result[0].stallID });
  } catch (err) {
    console.error("💥 Login route error:", err); // <-- log real error
    res.json({ success: false, message: 'Server error' });
  }
});
*/
// ================== CATEGORY MANAGEMENT ==================

// 📂 CATEGORY ROUTES

// ✅ Get all categories for a stall
// ================== CATEGORY ROUTES ==================
// backend/routes/admin.js
router.get("/category", async (req, res) => {
  console.log("🧩 Full URL:", req.originalUrl);
  console.log("🧩 req.query:", req.query);

  const { stallID } = req.query;
  if (!stallID) {
    console.error("❌ Missing stallID in request query:", req.query);
    return res.status(400).json({ success: false, message: "Missing stallID" });
  }

  const db = await pool.getConnection();
  try {
    const [rows] = await db.query(
      "SELECT id, categoryName, description FROM category WHERE stallID = ? ORDER BY categoryName",
      [stallID]
    );
    res.json({ success: true, categories: rows });
  } catch (err) {
    console.error("❌ Fetch category error:", err);
    res.status(500).json({ success: false, message: "DB error" });
  } finally {
    db.release();
  }
});





// ✅ Add new category
router.post("/category", async (req, res) => {
 const db = await pool.getConnection();
  try {
    const { stallID, categoryName, description } = req.body;
    if (!stallID || !categoryName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    await db.query(
      "INSERT INTO category (stallID, categoryName, description) VALUES (?, ?, ?)",
      [stallID, categoryName, description || ""]
    );
    res.json({ success: true, message: "Category added" });
  } catch (err) {
    console.error("❌ Add category error:", err);
    res.status(500).json({ success: false, message: "DB error" });
  }
});

// ✅ Update category
router.put("/category/:id", async (req, res) => {
 const db = await pool.getConnection();
  try {
    const { id } = req.params;
    const { stallID, categoryName, description } = req.body;

    if (!id || !stallID || !categoryName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    await db.query(
      "UPDATE category SET categoryName = ?, description = ? WHERE id = ? AND stallID = ?",
      [categoryName, description || "", id, stallID]
    );
    res.json({ success: true, message: "Category updated" });
  } catch (err) {
    console.error("❌ Update category error:", err);
    res.status(500).json({ success: false, message: "DB error" });
  }
});

// ✅ Delete category
router.delete("/category/:id", async (req, res) => {
const db = await pool.getConnection();
  try {
    const { id } = req.params;
    const { stallID } = req.body;

    if (!id || !stallID) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    await db.query("DELETE FROM category WHERE id = ? AND stallID = ?", [id, stallID]);
    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    console.error("❌ Delete category error:", err);
    res.status(500).json({ success: false, message: "DB error" });
  }
});


// ================= FOODS ROUTES ==================

// Get all foods
router.get("/foods", async (req, res) => {
 const db = await pool.getConnection();
  const { stallID } = req.query;

  if (!stallID) {
    return res.status(400).json({ success: false, message: "Missing stallID" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM foods WHERE stallID = ? ORDER BY foodName ASC",
      [stallID]
    );
    console.log(rows);
    res.json(rows);

  } catch (err) {
    console.error("❌ Fetch foods error:", err);
    res.status(500).json({ success: false, message: "DB error" });
  }finally {
    db.release();
  }
});
/*
// --- Multer config ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));

  },
  filename: (req, file, cb) => {
    const stallID = req.body.stallID || "unknown";
    // Replace spaces with underscores to keep filenames safe
    const safeName = stallID + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, safeName);
  }
});

const upload = multer({ storage });
*/
// --- POST /foods ---
router.post("/foods", upload.single("image"), async (req, res) => {
 const db = await pool.getConnection();
  try {
    const { stallID, foodNo, foodName, price, prom_price, category, description } = req.body;
     console.log(req.body);
    // FIX 1: Convert empty prom_price to 0
    const processedPromPrice = (prom_price === '' || prom_price === null || prom_price === undefined)
      ? 0
      : parseFloat(prom_price);

    // FIX 2: Use new image path
    const imageUrl = req.file ? `food-images/${req.file.filename}` : null;

    const query = `
      INSERT INTO foods (stallID, foodNo, foodName, price, prom_price, category, description, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      stallID,
      foodNo,
      foodName,
      parseFloat(price),
      processedPromPrice,
      category,
      description,
      imageUrl
    ];

    const [result] = await db.execute(query, values);
    res.json({ message: 'Food added successfully', result });
  } catch (error) {
    console.error('Add food error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
// ✅ Update food (with optional new image)
//router.put("/foods/:id", upload.single("image"), async (req, res) => {
 router.put('/foods/:id', upload.single('image'), async (req, res) => {
const db = await pool.getConnection();
   try {
    const { stallID, foodNo, foodName, price, prom_price, category, description } = req.body;
    console.log(req.body);
    // FIX 1: Convert empty prom_price to 0
    const processedPromPrice = (prom_price === '' || prom_price === null || prom_price === undefined)
      ? 0
      : parseFloat(prom_price);

    // FIX 2: Handle image path - convert from /uploads/ to food-images/
    let imageUrl = null;
    if (req.file) {
      // Use new path structure without leading slash
      imageUrl = `food-images/${req.file.filename}`;
    }

    const query = `
      UPDATE foods
      SET stallID=?, foodNo=?, foodName=?, price=?, prom_price=?, category=?, description=?
      ${imageUrl ? ', imageUrl=?' : ''}
      WHERE id=?
    `;

    const values = [
      stallID,
      foodNo,
      foodName,
      parseFloat(price),
      processedPromPrice,
      category,
      description,
      ...(imageUrl ? [imageUrl] : []),
      req.params.id
    ];

    // Execute the query
    const [result] = await db.execute(query, values);

    res.json({ message: 'Food updated successfully', result });
  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete food
router.delete("/foods/:id", async (req, res) => {
 const db = await pool.getConnection();
  const { id } = req.params;
  const { stallID } = req.body;

  try {
    await db.query("DELETE FROM foods WHERE id=? AND stallID=?", [id, stallID]);
    res.json({ success: true, message: "Food deleted" });
  } catch (err) {
    console.error("❌ Delete food error:", err);
    res.status(500).json({ success: false, message: "DB error" });
  }
});

// Customer Ordering page
// Backend routes for orders
// orders.js

// Create order

// admin.js
router.post("/orders", async (req, res) => {
 const db = await pool.getConnection();
  const { stallID, tableNumber, total, status } = req.body;
console.log("Incoming orderData:", req.body);

try {
    const orderID = uuidv4();
    const [result] = await db.query(
      `INSERT INTO orders (orderID, stallID, tableNumber, total, status, orderDate)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [orderID, stallID, tableNumber, total, status]
    );

    res.json({ success: true, orderId: orderID });
  } catch (err) {
    console.error("Insert order error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// Create order items and addons

// POST /api/admin/order-items
router.post("/order-items", async (req, res) => {
 const db = await pool.getConnection();
  const { orderId, foodId, foodName, quantity, unitPrice, totalPrice, notes, selectedAddons, stallID } = req.body;

  try {
    await db.beginTransaction();

    // Insert order item
    const [result] = await db.query(
      `INSERT INTO order_items (orderID, foodID, foodName, quantity, unitPrice, totalPrice, notes, stallID)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderId, foodId, foodName, quantity, unitPrice, totalPrice, notes, stallID]
    );

    const orderItemID = result.insertId;

    // ✅ Insert each addon if any
    if (Array.isArray(selectedAddons) && selectedAddons.length > 0) {
      for (const addon of selectedAddons) {
        await db.query(
          `INSERT INTO order_item_addons (orderItemID, addonName, addonQuantity, addonPrice)
           VALUES (?, ?, ?, ?)`,
          [orderItemID, addon.name, addon.quantity, addon.price]
        );
      }
    }

    await db.commit();
    res.json({ success: true, orderItemID });
  } catch (err) {
    await db.rollback();
    console.error("Insert order item error:", err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    db.release();
  }
});



// Get all addons for a stall
// Get all addons for a stall
router.get("/addons", async (req, res) => {
const db = await pool.getConnection();
  try {
    console.log(req.query);
    const { stallID } = req.query;
    const [rows] = await db.query("SELECT * FROM addons WHERE stallID = ?", [stallID]);
     console.log(rows);
    res.json({ success: true, addons: rows });
  } catch (err) {
    console.error("❌ Error fetching addons:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create new addon
router.post("/addons", async (req, res) => {
  const db = await pool.getConnection();
  try {
    const { stallID, name, price } = req.body;
    const [result] = await db.query(
      "INSERT INTO addons (stallID, name, price) VALUES (?, ?, ?)",
      [stallID, name, price]
    );
    res.json({ success: true, addon: { id: result.insertId, stallID, name, price } });
  } catch (err) {
    console.error("❌ Error creating addon:", err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update addon
router.put("/addons/:id", async (req, res) => {
 const db = await pool.getConnection();
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    await db.query("UPDATE addons SET name = ?, price = ? WHERE id = ?", [name, price, id]);
    res.json({ success: true, addon: { id, name, price } });
  } catch (err) {
    console.error("❌ Error updating addon:", err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete addon
router.delete("/addons/:id", async (req, res) => {
 const db = await pool.getConnection();
  try {
    const { id } = req.params;
    await db.query("DELETE FROM addons WHERE id = ?", [id]);
    res.json({ success: true, message: "Addon deleted" });
  } catch (err) {
    console.error("❌ Error deleting addon:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// foods/admin.js
// Get all orders for kitchen
// ✅ Get all orders for KitchenDisplay
router.get("/orders/kitchen", async (req, res) => {
  const db = await pool.getConnection();
  try {
    const { stallID } = req.query;
    if (!stallID) {
      return res.status(400).json({ success: false, error: "Missing stallID" });
    }

    // Fetch active orders
    const [orders] = await db.query(
      `SELECT * FROM orders
       WHERE stallID = ? AND status NOT IN ('delivered', 'cancelled')
       ORDER BY orderDate ASC`,
      [stallID]
    );

    // Attach items to each order
    for (const order of orders) {
      const [items] = await db.query(
        `SELECT foodName, quantity, unitPrice, notes
         FROM order_items WHERE orderID = ?`,
        [order.orderID]
      );
      order.items = items;
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Get kitchen orders error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch kitchen orders" });
  } finally {
    db.release();
  }
});

// ✅ Update order status for KitchenDisplay
router.put('/kitchen/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, error: 'Missing orderId or status' });
    }

    const [result] = await db.query(
      `UPDATE orders SET status = ? WHERE orderId = ?`,
      [status, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    console.log(`✅ Order ${orderId} updated to status: ${status}`);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Update kitchen order error:', error);
    res.status(500).json({ success: false, error: 'Failed to update order' });
  }
});


router.get("/orders/pending", async (req, res) => {
  const db = await pool.getConnection();
  const { stallID } = req.query;
  let { status } = req.query; // might be an array ['pending','preparing','ready']

  console.log("Fetching orders:", { stallID, status });

  try {
    // Ensure status is always an array
    if (!Array.isArray(status)) {
      status = [status];
    }

    // Fetch all matching orders
    const [rows] = await db.query(
      `SELECT * FROM orders
       WHERE stallID = ?
       AND status IN (?)
       ORDER BY orderDate DESC`,
      [stallID, status]
    );

    console.log("✅ Pending/Active orders found:", rows.length);
    res.json({ orders: rows });
  } catch (err) {
    console.error("❌ Fetch orders error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    db.release();
  }
});


router.get('/order_items', async (req, res) => {
  const { stallID, orderID } = req.query;
  console.log('Fetching items for order:', orderID);

  try {
    const [rows] = await pool.query(
      'SELECT * FROM order_items WHERE stallID = ? AND orderID = ?',
      [stallID, orderID]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'No items found' });
    }

    // ❌ res.json({ success: true, data: items });
    // ✅ FIX:
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('❌ Fetch order items error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



router.get("/order_item_addons", async (req, res) => {
  const { orderItemID } = req.query;
  const db = await pool.getConnection();
  try {
    const [rows] = await db.query(`SELECT * FROM order_item_addons WHERE orderItemID = ?`, [orderItemID]);
 if (rows.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    console.log("orders-item-addons:", rows);
    return res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    db.release();
  }
});
 router.get("/orders/:orderId/customer-receipt", async (req, res) => {
  const { orderId } = req.params;
  const db = await pool.getConnection();
  try {
    const [orderRows] = await db.query(`SELECT * FROM orders WHERE orderID = ?`, [orderId]);
    const [items] = await db.query(`SELECT * FROM order_items WHERE orderID = ?`, [orderId]);
    for (const item of items) {
      const [addons] = await db.query(`SELECT addonName, addonQuantity, addonPrice FROM order_item_addons WHERE orderItemID = ?`, [item.orderItemID]);
      item.addons = addons;
    }

    const order = orderRows[0];
    const doc = new PDFDocument({ margin: 10 });
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    doc.fontSize(14).text("CUSTOMER RECEIPT", { align: "center" });
    doc.text(`Table: ${order.tableNumber}`);
    doc.text(`Date: ${new Date(order.orderDate).toLocaleString()}`);
    doc.moveDown();

    items.forEach((item) => {
      doc.text(`${item.foodName} × ${item.quantity} — RM ${(item.unitPrice * item.quantity).toFixed(2)}`);
      if (item.addons?.length > 0) {
        item.addons.forEach((a) =>
          doc.text(`  ➕ ${a.addonName} × ${a.addonQuantity} — RM ${(a.addonPrice * a.addonQuantity).toFixed(2)}`)
        );
      }
      doc.moveDown();
    });

    doc.text(`Total: RM ${order.total.toFixed(2)}`, { align: "right" });
    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    db.release();
  }
});

    /*
    // Attach addons for each order item
    for (const item of items) {
      const [addons] = await db.query(
        `SELECT addonName, addonQuantity, addonPrice
         FROM order_item_addons
         WHERE orderItemID = ?`,
        [item.orderItemID]
      );
      item.addons = addons || [];
    }

    res.json({
      order: orderRows[0],
      items,
    });
  */

// GET /api/admin/orders/:orderId/details

router.get("/orders/:orderId/details", async (req, res) => {
  const db = await pool.getConnection();
  const { orderId } = req.params;

  try {
    // Fetch order header
    const [orderRows] = await db.query(
      `SELECT * FROM orders WHERE orderID = ?`,
      [orderId]
    );

    if (orderRows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Fetch order items
    const [items] = await db.query(
      `SELECT * FROM order_items WHERE orderID = ?`,
      [orderId]
    );

    // Attach addons for each order item
    for (const item of items) {
      const [addons] = await db.query(
        `SELECT addonName, addonQuantity, addonPrice
         FROM order_item_addons
         WHERE orderItemID = ?`,
        [item.orderItemID]
      );
      item.addons = addons || [];
    }

    res.json({
      order: orderRows[0],
      items,
    });
  } catch (err) {
    console.error("❌ Fetch order details error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    db.release();
  }
});
// Example: GET /api/admin/qrcodes?stallID=ABC123&tables=10
// ✅ Generate QR codes for customer ordering // ✅ make sure this is imported

// ✅ GET /api/admin/qrcodes?stallID=mummy
// Example backend route

// Generate QR code for customer ordering page
router.get('/qrcode', async (req, res) => {
  try {
    // Replace 'localhost:3000' with your frontend URL for development
    const customerLink = 'http://192.168.1.133:3000/ordering';
    // Use your local network IP so iPhone can scan it

    const qrDataURL = await QRCode.toDataURL(customerLink);
    res.json({ qr: qrDataURL });
  } catch (err) {
    console.error('QR code generation error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/orders/:orderId/receipt-pdf
router.get("/orders/:orderId/receipt-pdf", async (req, res) => {
  const { orderId } = req.params;
  const db = await pool.getConnection();

  try {
    const [orderRows] = await db.query(`SELECT * FROM orders WHERE orderID = ?`, [orderId]);
    const [items] = await db.query(`SELECT * FROM order_items WHERE orderID = ?`, [orderId]);

    for (const item of items) {
      const [addons] = await db.query(
        `SELECT addonName, addonQuantity, addonPrice FROM order_item_addons WHERE orderItemID = ?`,
        [item.orderItemID]
      );
      item.addons = addons;
    }

    const order = orderRows[0];
    const doc = new PDFDocument({ margin: 20 });

    // Send PDF directly to browser
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=receipt-${orderId}.pdf`);
    doc.pipe(res);

    doc.fontSize(14).text("KITCHEN ORDER RECEIPT", { align: "center" });
    doc.moveDown();
    doc.fontSize(10).text(`Table: ${order.tableNumber}`);
    doc.text(`Date: ${new Date(order.orderDate).toLocaleString()}`);
    doc.moveDown();

    items.forEach((item) => {
      doc.fontSize(11).text(`${item.foodName} × ${item.quantity}`);
      doc.text(`RM ${(item.unitPrice * item.quantity).toFixed(2)}`, { align: "right" });
      if (item.notes) doc.text(`📝 ${item.notes}`);
      if (item.addons?.length > 0) {
        item.addons.forEach((a) =>
          doc.text(`  ➕ ${a.addonName} × ${a.addonQuantity} — RM ${(a.addonPrice * a.addonQuantity).toFixed(2)}`)
        );
      }
      doc.moveDown();
    });

    doc.text(`Total: RM ${order.total.toFixed(2)}`, { align: "right" });
    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    db.release();
  }
});

// PATCH /api/admin/orders/:orderId/status
router.patch("/orders/:orderId/status", async (req, res) => {
  const db = await pool.getConnection();
  const { orderId } = req.params;
  const { status } = req.body; // expecting: "preparing", "ready", "served"

  try {
    await db.query(`UPDATE orders SET status = ? WHERE orderID = ?`, [status, orderId]);

    // Notify all connected clients in real time
    if (req.io) {
      req.io.emit("orderStatusUpdated", { orderId, status });
    }

    res.json({ success: true, orderId, status });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    db.release();
  }
});


router.get("/orders/:orderId/kitchen-receipt", async (req, res) => {
  const { orderId } = req.params;
  const db = await pool.getConnection();
  try {
    const [orderRows] = await db.query(`SELECT * FROM orders WHERE orderID = ?`, [orderId]);
    const [items] = await db.query(`SELECT * FROM order_items WHERE orderID = ?`, [orderId]);
    for (const item of items) {
      const [addons] = await db.query(`SELECT addonName, addonQuantity, addonPrice FROM order_item_addons WHERE orderItemID = ?`, [item.orderItemID]);
      item.addons = addons;
    }

    const order = orderRows[0];
    const doc = new PDFDocument({ margin: 10 });
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    doc.fontSize(14).text("KITCHEN COPY", { align: "center" });
    doc.text(`Table: ${order.tableNumber}`);
    doc.text(`Date: ${new Date(order.orderDate).toLocaleString()}`);
    doc.moveDown();

    items.forEach((item) => {
      doc.text(`${item.foodName} × ${item.quantity}`);
      if (item.notes) doc.text(`📝 ${item.notes}`);
      if (item.addons?.length > 0) {
        item.addons.forEach((a) => doc.text(`  ➕ ${a.addonName} × ${a.addonQuantity}`));
      }
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    db.release();
  }
});


// In your backend routes (orders.js or similar)

// Update order status
router.put('/orders/:orderId/status', async (req, res) => {
 const db = await pool.getConnection();
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Update order status in database
    const result = await db.query(
      'UPDATE orders SET status = ? WHERE orderId = ?',
      [status, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ success: false, error: 'Failed to update order status' });
  }
});




// Get order details with items
router.get('/orders/:orderId/items', async (req, res) => {
  try {
    const { orderId } = req.params;

    const items = await db.query(`
      SELECT * FROM order_items
      WHERE orderId = ?
      ORDER BY id ASC
    `, [orderId]);

    res.json(items);
  } catch (error) {
    console.error('Get order items error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch order items' });
  }
});

// Update order status
// ✅ Update order status
router.put("/orders/status", async (req, res) => {
  const db = await pool.getConnection();
  const { stallID, orderID, status } = req.body;
  console.log("Body :"+stallID+" = "+orderID+" = "+status);
  if (!stallID || !orderID || !status) {
    db.release();
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      `UPDATE orders SET status = ? WHERE stallID = ? AND orderID = ?`,
      [status, stallID, orderID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "✅ Order status updated successfully" });
  } catch (err) {
    console.error("❌ Error updating order status:", err);
    res.status(500).json({ error: err.message });
  } finally {
    db.release();
  }
});

// Update order item status
router.put('/order_items_status/:orderItemID', async (req, res) => {
 const db = await pool.getConnection();
  try {
    const { orderItemID } = req.params;
    const { status } = req.body;

    console.log('🔄 Updating order item status:', { orderItemID, status });

    // Validate status
    const validStatuses = ['pending', 'preparing', 'ready', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Update order item status
    const query = 'UPDATE order_items SET status = ? WHERE orderItemID = ?';
    const [result] = await db.execute(query, [status, orderItemID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Order item not found'
      });
    }

    console.log('✅ Order item status updated:', { orderItemID, status });

    res.json({
      success: true,
      message: 'Order item status updated successfully',
      orderItemID,
      status
    });

  } catch (error) {
    console.error('❌ Error updating order item status:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Backend: /api/kitchen/display
router.get('/kitchen/display', async (req, res) => {
  try {
    const { stallID } = req.query;

    const orders = await Order.findAll({
      where: {
        stallID,
        status: ['pending', 'preparing', 'ready']
      },
      include: [{
        model: OrderItem,
        include: [OrderItemAddon]
      }],
      order: [['orderDate', 'ASC']]
    });

    const kitchenOrders = orders.map(order => ({
      orderID: order.orderID,
      tableNumber: order.tableNumber,
      status: order.status,
      time: order.orderDate.toLocaleTimeString(),
      items: order.OrderItems.map(item => ({
        orderItemID: item.orderItemID,
        foodName: item.foodName,
        quantity: item.quantity,
        status: item.status,
        notes: item.notes,
        selectedAddons: item.OrderItemAddons.map(addon => ({
          addonName: addon.addonName,
          addonQuantity: addon.addonQuantity
        }))
      }))
    }));
     console.log("Kitchen display orders:", kitchenOrders);
    res.json({ orders: kitchenOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
