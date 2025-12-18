// Load environment variables from .env inside foods folder
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db"); // Your db.js inside foods folder

const app = express();

// ----------------------
// MIDDLEWARE
// ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: allow frontend domains
app.use(
  cors({
    origin: [
      "https://stall-centralsoft.com", // main frontend domain
      "https://food.stall-centralsoft.com", // subdomain (if used)
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);

// ----------------------
// ROUTES
// ----------------------
const adminRoutes = require("./routes/admin");
const orderRoutes = require("./routes/orders");
const menuRoutes = require("./routes/menu");

// Use routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/orders", orderRoutes);
app.use("/api/menu", menuRoutes);

// ----------------------
// STATIC FILES (IMAGE UPLOADS)
// ----------------------

// Serve food images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----------------------
// TEST ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.json({ status: "Foodstall backend running" });
});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🥗 Foodstall backend running on port ${PORT}`);
});
