const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "testdb",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,   // ⏱ 10s before giving up
  enableKeepAlive: true,   // ⚡ keep sockets alive
  keepAliveInitialDelay: 0 // no delay for keep-alive
});

module.exports = db;

