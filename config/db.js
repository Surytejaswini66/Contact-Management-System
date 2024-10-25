const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./sqlite.db", (err) => {
  if (err) {
    console.error("Failed to connect to SQLite Database:", err.message);
  } else {
    console.log("Connected to SQLite Database.");
  }
});

module.exports = db;
