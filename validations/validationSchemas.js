const { check } = require("express-validator");

exports.contactValidation = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("phone").notEmpty().withMessage("Phone number is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("timezone").notEmpty().withMessage("Timezone is required"),
];
