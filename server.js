const express = require("express");
const cors = require("cors");
require("dotenv").config();
const appMiddleware=require("./middleware/authHadler")

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

// Connect to MongoDB (Mongoose)
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// app.use(appMiddleware)
// Routes
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

app.use("/api/auth", authRoutes); 
// app.use("/api/users", userRoutes);


// Global Error Handler (must be last)
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
