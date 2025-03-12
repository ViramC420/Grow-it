require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet"); // SECURE HTTPS HEADERS
const morgan = require("morgan"); // FOR LOGGING

// IMPORT ROUTES & MIDDLEWARE
const authRoutes = require("./routes/auth");
const sensorRoutes = require("./routes/sensorRoutes");
const {
  authenticationToken,
  authorizeRoles,
} = require("./middleware/authMiddleware");
const plantRoutes = require("./routes/plantRoutes");
const sensorConfigRoutes = require("./routes/sensorConfigRoutes");

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// CONNECTION TO MONGODB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

console.log("Mongo URI:", process.env.MONGO_URI);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/sensors/config", sensorConfigRoutes);

// ADMIN-ONLY ROUTE (Protected)
app.get(
  "/api/admin/dashboard",
  authenticationToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "🔐 Welcome Admin! You have full access." });
  }
);

// USER & ADMIN ROUTE (Protected)
app.get(
  "/api/user/profile",
  authenticationToken,
  authorizeRoles("user", "admin"),
  (req, res) => {
    res.json({ message: "👤 User Profile Data" });
  }
);

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("🌱 Grow It! Backend is Running...");
});

// GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
