const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");
const User = sequelize.define(
  "User",
  {
    fullName: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING, allowNull: false },
    hireDate: { type: DataTypes.DATE, allowNull: false },
    employmentStatus: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    workLocation: { type: DataTypes.STRING, allowNull: false },
    department: { type: DataTypes.STRING, allowNull: false },
    leaveDate: { type: DataTypes.STRING, allowNull: true },
    phoneNo: { type: DataTypes.STRING, allowNull: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    picture: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  },
);

module.exports = User;
