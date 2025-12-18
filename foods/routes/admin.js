// foods/admin.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");  // keep this
// REMOVE THIS ↓
// const Jimp = require("jimp");


// ------------------ Upload Directory ------------------
const UPLOAD_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ------------------ Multer Setup ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${req.body.stallID || "file"}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// ------------------ Admin Login ------------------
router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  if (!adminID || !password) return res.json({ success: false, message: "Stall ID and password required" });

  const db = await pool.getConnection();
  try {
    const [rows] = await db.query("SELECT * FROM admins WHERE stallID=?", [adminID]);
    if (!rows.length) return res.json({ success: false, message: "Admin not found" });

    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) return res.json({ success: false, message: "Incorrect password" });

    res.json({ success: true, message: "Login successful", admin: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    db.release();
  }
});

// ------------------ QR Code Generation ------------------
router.post("/qrcode", async (req, res) => {
  const { data, logoPath } = req.body;
  try {
    const qrBuffer = await QRCode.toBuffer(data, { errorCorrectionLevel: "H", type: "png" });

    if (logoPath) {
      const qrImage = await Jimp.read(qrBuffer);
      const logo = await Jimp.read(path.join(UPLOAD_DIR, logoPath));
      logo.resize(qrImage.bitmap.width / 4, Jimp.AUTO);
      const x = (qrImage.bitmap.width - logo.bitmap.width) / 2;
      const y = (qrImage.bitmap.height - logo.bitmap.height) / 2;
      qrImage.composite(logo, x, y);
      const finalBuffer = await qrImage.getBufferAsync(Jimp.MIME_PNG);
      res.set("Content-Type", "image/png").send(finalBuffer);
    } else {
      res.set("Content-Type", "image/png").send(qrBuffer);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "QR generation failed" });
  }
});

// ------------------ Image Upload ------------------
router.post("/upload/logo", upload.single("logo"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  res.json({ success: true, filename: req.file.filename });
});

// ------------------ Categories CRUD ------------------
router.get("/categories", async (req, res) => {
  const db = await pool.getConnection();
  try {
    const [rows] = await db.query("SELECT * FROM categories");
    res.json({ success: true, categories: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

router.post("/categories", async (req, res) => {
  const { name } = req.body;
  const db = await pool.getConnection();
  try {
    await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
    res.json({ success: true, message: "Category added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

router.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const db = await pool.getConnection();
  try {
    await db.query("UPDATE categories SET name=? WHERE id=?", [name, id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

router.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const db = await pool.getConnection();
  try {
    await db.query("DELETE FROM categories WHERE id=?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

// ------------------ Foods CRUD ------------------
router.get("/foods", async (req, res) => {
  const db = await pool.getConnection();
  try {
    const [rows] = await db.query("SELECT * FROM foods");
    res.json({ success: true, foods: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

router.post("/foods", upload.single("image"), async (req, res) => {
  const { name, price, categoryID } = req.body;
  const image = req.file ? req.file.filename : null;
  const db = await pool.getConnection();
  try {
    await db.query("INSERT INTO foods (name, price, categoryID, image) VALUES (?, ?, ?, ?)", [name, price, categoryID, image]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

router.put("/foods/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, price, categoryID } = req.body;
  const image = req.file ? req.file.filename : null;
  const db = await pool.getConnection();
  try {
    const query = image
      ? "UPDATE foods SET name=?, price=?, categoryID=?, image=? WHERE id=?"
      : "UPDATE foods SET name=?, price=?, categoryID=? WHERE id=?";
    const params = image ? [name, price, categoryID, image, id] : [name, price, categoryID, id];
    await db.query(query, params);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

router.delete("/foods/:id", async (req, res) => {
  const { id } = req.params;
  const db = await pool.getConnection();
  try {
    await db.query("DELETE FROM foods WHERE id=?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

// ------------------ Orders ------------------
router.get("/orders", async (req, res) => {
  const { stallID, status } = req.query;
  const db = await pool.getConnection();
  try {
    let query = "SELECT * FROM orders WHERE stallID=?";
    const params = [stallID];

    if (status) {
      const statusArray = Array.isArray(status) ? status : [status];
      const placeholders = statusArray.map(() => "?").join(",");
      query += ` AND status IN (${placeholders})`;
      params.push(...statusArray);
    }

    const [rows] = await db.query(query, params);
    res.json({ success: true, orders: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

router.patch("/orders/:orderId/status", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const db = await pool.getConnection();
  try {
    await db.query("UPDATE orders SET status=? WHERE id=?", [status, orderId]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  } finally {
    db.release();
  }
});

module.exports = router;
