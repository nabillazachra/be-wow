"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile.belongsTo(models.users, {
        as: "users",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  profile.init(
    {
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "profile",
    }
  );
  return profile;
};
