const csv = require("csv-parser");
const fs = require("fs");
const db = require("../config/db");
const moment = require("moment-timezone");

exports.uploadCSV = (req, res) => {
  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      const createdAt = moment.utc().format("YYYY-MM-DD HH:mm:ss");
      results.forEach((row) => {
        db.run(
          `INSERT INTO contacts (name, email, phone, address, timezone, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
          [row.name, row.email, row.phone, row.address, row.timezone, createdAt]
        );
      });
      res.status(201).json({ message: "Contacts uploaded successfully" });
    });
};
