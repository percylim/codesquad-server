const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // frontend already sets renFile (companyID-filename)
  },
});

// File filter (optional: only allow images)
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

// Multer middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Route: POST /api/imageupload
router.post("/", upload.single("avatar"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    res.json({
      success: 1,
      message: "File uploaded successfully",
      file: req.file.filename,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: 0, message: "Server error during upload" });
  }
});

module.exports = router;