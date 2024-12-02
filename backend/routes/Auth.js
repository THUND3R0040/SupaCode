const { register, login } = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/authvalidation.middleware");

const express = require("express");
const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
