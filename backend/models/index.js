// models/index.js
const Sequelize = require("sequelize");
// const createUserModel = require("./User");
const createUserModel = require("./users");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Set to true if you want SQL query logs
});

const db = {
  sequelize,
  Sequelize,
  User: createUserModel(sequelize), // Initialize User model
};

// Export db object with all models
module.exports = db;
