require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// IMPORT ROUTE & MIDDLEWARE
const authRoutes = require("./routes/authRoutes");
const { authenticateToken, authorizeRoles } = requre(
  "../middleware/authMiddlware"
);

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

// CONNECTION TO MONGODB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ROUTES
app.use("/api/auth", authRoutes);

// ADMIN-ONLY ROUTE (Protected)
app.get(
  "/api/admin/dashboard",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "🔐 Welcome Admin! You have full access." });
  }
);

// USER & ADMIN ROUTE (Protected)
app.get(
  "/api/user/profile",
  authenticateToken,
  authorizeRoles("user", "admin"),
  (req, res) => {
    res.json({ message: "👤 User Profile Data" });
  }
);

app.get("/", (req, res) => {
  res.send("🌱 Grow It! Backend is Running...");
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
