const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const appMiddleware = require("./middleware/authHadler");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(appMiddleware); // App ID + Version check

// Routes
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Global Error Handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect DB first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
});
