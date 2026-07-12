const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const appMiddleware = require("./middleware/authHadler");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "appid", "version", "userid"],
  })
);
app.use(express.json());
app.use(appMiddleware);

// DB connection — har request se pehle connect karo (Vercel serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

// Error Handler
app.use(errorHandler);

// Local development mein server start karo
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
