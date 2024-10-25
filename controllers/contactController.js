const db = require("../config/db");
const { validationResult } = require("express-validator");
const moment = require("moment-timezone");

exports.addContact = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, address, timezone } = req.body;
  const createdAt = moment.utc().format("YYYY-MM-DD HH:mm:ss");

  db.run(
    `INSERT INTO contacts (name, email, phone, address, timezone, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone, address, timezone, createdAt],
    function (err) {
      if (err) return res.status(500).json({ error: "Failed to add contact" });
      res.status(201).json({ message: "Contact added successfully" });
    }
  );
};

exports.getContacts = (req, res) => {
  const { name, email, timezone } = req.query;
  const filterQuery = `SELECT * FROM contacts WHERE deleted = 0 ${
    name ? "AND name LIKE ?" : ""
  } ${email ? "AND email LIKE ?" : ""} ${timezone ? "AND timezone = ?" : ""}`;
  const filterParams = [
    name && `%${name}%`,
    email && `%${email}%`,
    timezone,
  ].filter(Boolean);

  db.all(filterQuery, filterParams, (err, rows) => {
    if (err)
      return res.status(500).json({ error: "Failed to retrieve contacts" });
    res.json(rows);
  });
};

exports.updateContact = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, timezone } = req.body;

  db.run(
    `UPDATE contacts SET name = ?, email = ?, phone = ?, address = ?, timezone = ? WHERE id = ? AND deleted = 0`,
    [name, email, phone, address, timezone, id],
    function (err) {
      if (err)
        return res.status(500).json({ error: "Failed to update contact" });
      res.json({ message: "Contact updated successfully" });
    }
  );
};

exports.deleteContact = (req, res) => {
  const { id } = req.params;

  db.run(`UPDATE contacts SET deleted = 1 WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: "Failed to delete contact" });
    res.json({ message: "Contact deleted successfully" });
  });
};
