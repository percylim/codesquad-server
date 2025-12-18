const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    fs.mkdirSync(uploadDir, { recursive: true }); // ensure folder exists
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    try {
      // get companyID from body or headers
      const companyID = req.body.companyID || req.headers['companyid'];

      if (!companyID) {
        return cb(new Error('companyID is required for upload'));
      }

      // sanitize companyID (remove spaces, slashes, etc.)
      const safeCompanyID = companyID.replace(/[^a-zA-Z0-9_-]/g, '');

      // Prevent overwriting by adding timestamp
      const finalName = `${safeCompanyID}-${Date.now()}-${file.originalname}`;
      cb(null, finalName);
    } catch (err) {
      cb(err);
    }
  }
});

// File type filter (only images allowed)
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // ✅ 20MB max file size
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpg, jpeg, png, gif)'));
    }
  }
});

router.post('/', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: 'No file uploaded' });
  }

  console.log("✅ File uploaded:", req.file.filename);

  res.json({
    success: 1,
    message: 'Image uploaded successfully',
    filename: req.file.filename,
    previewURL: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
