"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookList.hasMany(models.books, {
        as: "books",
        foreignKey: {
          name: "booksId",
        },
      });
      bookList.hasOne(models.transaction, {
        as: "transaction",
        foreignKey: "transId",
      });
    }
  }
  bookList.init(
    {
      booksId: DataTypes.INTEGER,
      transId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bookList",
    }
  );
  return bookList;
};
