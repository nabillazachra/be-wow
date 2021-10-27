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
          name: "bookId",
        },
      });
      // bookList.hasMany(models.users, {
      //   as: "users",
      //   foreignKey: "userId",
      // });
    }
  }
  bookList.init(
    {
      bookId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bookList",
    }
  );
  return bookList;
};
