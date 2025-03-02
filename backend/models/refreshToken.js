const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const RefreshToken = sequelize.define("RefreshToken", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  },
});

module.exports = RefreshToken;
