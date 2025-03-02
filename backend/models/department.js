const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "departments",
    timestamps: false,
  }
);

module.exports = Department;