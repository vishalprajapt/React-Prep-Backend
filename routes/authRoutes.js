const express = require("express");
const router = express.Router();

const { register, login, getProfile } = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// PROFILE (Protected Route - token required)
router.get("/profile", protect, getProfile);

module.exports = router;
