const express = require("express");
const { connectDB } = require("./config/database");
const { sequelize } = require("./config/database");
require("dotenv").config();

const app = express();
app.use(express.json());

const authRoutes = require("./routes/authRoute");
app.use("/api/auth", authRoutes);

connectDB();


sequelize.sync({ alter: true }) 
  .then(() => {
    console.log("✅ All tables synced.");
    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  })
  .catch(err => {
    console.error("❌ Error syncing tables:", err);
  });
