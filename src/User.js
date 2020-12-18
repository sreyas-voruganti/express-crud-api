const sequelize = require("./db");
const { DataTypes } = require("sequelize");

module.exports = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
