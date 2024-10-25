const db = require("../config/db");

// Create Contacts Table
db.run(
  `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        timezone TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        deleted INTEGER DEFAULT 0
    )`
);
