const db = require("../config/db");

// Create File Uploads Table (optional)
db.run(
  `CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fileName TEXT NOT NULL,
        uploadDate TEXT DEFAULT CURRENT_TIMESTAMP
    )`
);
