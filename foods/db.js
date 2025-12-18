const mysql = require("mysql2/promise");

// Use environment variables or hardcode for now
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "percy584597",
  database: process.env.DB_NAME || "foodstall",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
