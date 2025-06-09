const fs = require("fs");
const path = require("path");
const { sequelize } = require("../config/database");

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== "index.js")
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, require("sequelize").DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;

module.exports = db;
