const { books, users } = require("../../models");

exports.addBook = async (req, res) => {
  try {
    await books.create(req.body);

    res.send({
      status: "success",
      message: "Add book finished",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

//Get all data books
exports.getBooks = async (req, res) => {
  try {
    const data = await books.findAll({
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: ["status", "createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["booksId", "createdAt", "updatedAt", "idUser"],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await books.findAll({
      where: { id },
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: ["status", "createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["booksId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: { book: data },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
