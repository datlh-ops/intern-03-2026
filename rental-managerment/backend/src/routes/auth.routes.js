const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validation.middleware");
const authDto = require("../dtos/auth.dto");

router.post("/register", validate(authDto.registerRequest), authController.register);
router.post("/login", validate(authDto.loginRequest), authController.login);

module.exports = router;
