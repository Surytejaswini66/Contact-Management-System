const express = require("express");
const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
  batchAddUpdateContacts, // New function for batch processing
  getContactsByDateRange, // New function for date range retrieval
} = require("../controllers/contactController");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for adding a new contact
router.post(
  "/",
  authMiddleware,
  [
    check("name").notEmpty(),
    check("email").isEmail(),
    check("phone").notEmpty(),
    check("address").notEmpty(),
    check("timezone").notEmpty(),
  ],
  addContact
);

// Route for batch adding/updating contacts
router.post(
  "/batch",
  authMiddleware,
  batchAddUpdateContacts // Implement this in your controller
);

// Route for retrieving contacts with filtering and sorting
router.get("/", authMiddleware, getContacts);

// Route for retrieving contacts created within a specific date range
router.get("/date-range", authMiddleware, getContactsByDateRange); // Implement this in your controller

// Route for updating contact details
router.put(
  "/:id",
  authMiddleware,
  [
    check("name").notEmpty(),
    check("email").isEmail(),
    check("phone").notEmpty(),
    check("address").notEmpty(),
    check("timezone").notEmpty(),
  ],
  updateContact
);

// Route for deleting contacts
router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;
