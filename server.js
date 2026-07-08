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
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(appMiddleware); // appid + version check — har route pe lagega

// Routes
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

// Error Handler
app.use(errorHandler);

// DB connect + server start
const startServer = async () => {
  await connectDB();

  if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
};

startServer();

module.exports = app;
