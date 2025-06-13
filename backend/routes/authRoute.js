const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.register);
router.post("/confirm", authController.confirm); // OTP from email
router.post("/login", authController.login);

module.exports = router;
