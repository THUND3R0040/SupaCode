const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user.controller");

router.get("/getUserById/:id", getUserById);

module.exports = router;
