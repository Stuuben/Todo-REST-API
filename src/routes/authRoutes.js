const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();
const {
  loginSchema,
  registerSchema,
} = require("../middleware/validation/validationSchema");
const { validate } = require("../middleware/validation/validationMiddleware");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
