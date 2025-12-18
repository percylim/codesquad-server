const express = require("express");
const router = express.Router();

const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const adminRouter = require("./routes/admin");

// Mount routes
router.use("/api/admin", adminRouter); // contains both /register and /login
router.use("/menu", menuRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
