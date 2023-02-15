const { body } = require("express-validator");

exports.registerSchema = [
  body("username")
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage(" You must provide a username that is more than 3 characters"),

  body("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("You must provide a valid email"),

  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage(
      "You must provide a password that is at least 6 characters long"
    ),
];

exports.loginSchema = [
  body("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("You must provide valid email adress"),

  body("password")
    .not()
    .isEmpty()
    .withMessage("You must provide a password that have at least 6 characters"),
];
