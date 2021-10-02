"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.users, {
        as: "users",
        foreignKey: {
          name: "userId",
        },
      });
      transaction.belongsTo(models.bookList, {
        as: "bookList",
        foreignKey: {
          name: "transId",
        },
      });
    }
  }
  transaction.init(
    {
      transferProof: DataTypes.STRING,
      remainingActive: DataTypes.STRING,
      userStatus: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
