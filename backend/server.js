const express = require("express");
const { connectDB } = require("./config/database");
const { sequelize } = require("./config/database");
const db = require("./models");
require("dotenv").config();

const app = express();
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoute");
app.use("/api/auth", authRoutes);

// Connect DB
connectDB();

// Auto-create tables without migrations
sequelize.sync({ alter: true })  // or use { force: true } for dropping and recreating
  .then(() => {
    console.log("✅ All tables synced.");
    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  })
  .catch(err => {
    console.error("❌ Error syncing tables:", err);
  });
