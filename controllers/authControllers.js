const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GENERATE JWT TOKEN
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ===================== REGISTER =====================
const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check existing email
    const existingEmail = await Auth.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Check existing mobile only if mobile is provided
    if (mobile && mobile.trim() !== "") {
      const existingMobile = await Auth.findOne({ mobile });

      if (existingMobile) {
        return res.status(400).json({
          success: false,
          message: "Mobile already exists",
        });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user data
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // Add mobile only if provided
    if (mobile && mobile.trim() !== "") {
      userData.mobile = mobile;
    }

    // Create user
    const user = await Auth.create(userData);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================== LOGIN =====================
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find by email OR mobile
    const user = await Auth.findOne({
      $or: [
        { email: identifier },
        { mobile: identifier },
      ],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================== GET PROFILE =====================
const getProfile = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};