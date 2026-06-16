const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const appMiddleware = require("./middleware/authHadler");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// DB Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(appMiddleware);

// Routes
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;