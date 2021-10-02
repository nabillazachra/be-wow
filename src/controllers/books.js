const { books, users } = require("../../models");
const Joi = require("joi");

exports.addBook = async (req, res) => {
  const data = req.body;
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    publicationDate: Joi.string().min(6).required(),
    pages: Joi.string().required(),
    author: Joi.string().min(5).required(),
    isbn: Joi.string().min(5).required(),
    about: Joi.string().min(5).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    const newBook = await books.create({
      ...data,
      bookFile: req.file.filename,
      userId: req.users.id,
    });

    let bookData = await books.findOne({
      where: {
        id: newBook.id,
      },
      attributes: {
        exclude: ["userId", "booksId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        book: {
          ...bookData.dataValues,
          bookFile: process.env.FILE_PATH + bookData.bookFile,
        },
      },
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
    let data = await books.findAll({
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: ["id", "status", "createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["booksId", "createdAt", "updatedAt", "userId"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        bookFile: process.env.FILE_PATH + item.bookFile,
      };
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
    let book = await books.findOne({
      where: { id },
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: ["id", "role", "createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["booksId", "createdAt", "updatedAt", "userId"],
      },
    });

    res.send({
      status: "success",
      data: {
        book,
        bookFile: process.env.FILE_PATH + bookData.bookFile,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    publicationDate: Joi.string().min(6).required(),
    pages: Joi.string().required(),
    author: Joi.string().min(5).required(),
    isbn: Joi.string().min(5).required(),
    about: Joi.string().min(5).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    const values = {
      ...data,
      bookFile: req.file.filename,
      userId: req.users.id,
    };

    const whereId = { where: { id } };

    await books.update(values, whereId);

    res.send({
      status: "success",
      message: `Update book with id ${id} finished`,
      data: {
        values,
        bookFile: process.env.FILE_PATH + values.bookFile,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await books.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      message: `Delete book with id ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
