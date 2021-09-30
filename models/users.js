"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.transaction, {
        as: "clientTransaction",
        foreignKey: {
          name: "userId",
        },
      });
      users.hasMany(models.transaction, {
        as: "adminTransaction",
        foreignKey: {
          name: "adminId",
        },
      });
      users.hasMany(models.books, {
        as: "books",
        foreignKey: {
          name: "userId",
        },
      });
      users.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  users.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
