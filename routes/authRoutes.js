const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");


// REGISTER
router.post("/register", register);


// LOGIN
router.post("/login", login);


// PROFILE (Protected Route)
router.get("/profile", getProfile);


module.exports = router;