"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      books.belongsTo(models.users, {
        as: "users",
        foreignKey: {
          name: "userId",
        },
      });
      books.hasMany(models.bookList, {
        as: "bookList",
        foreignKey: {
          name: "booksId",
        },
      });
    }
  }
  books.init(
    {
      title: DataTypes.STRING,
      publicationDate: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      author: DataTypes.STRING,
      isbn: DataTypes.STRING,
      about: DataTypes.STRING,
      bookFile: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return books;
};
