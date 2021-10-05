const { bookList, users, books } = require("../../models");

exports.addList = async (req, res) => {
  try {
    const { data } = req.body;

    const newList = await bookList.create({
      bookId: req.body.bookId,
      userId: req.users.id,
    });

    let list = await bookList.findOne({
      where: {
        id: newList.id,
      },
      include: {
        models: users,
        as: "users",
        attributes: {
          exclude: [
            "email",
            "password",
            "role",
            "phone",
            "gender",
            "address",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        booklist: {
          list,
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

exports.getLists = async (req, res) => {
  try {
    let list = await bookList.findAll({
      where: {
        userId: req.users.id,
      },
      include: {
        model: users,
        as: "users",
        attributes: {
          exclude: [
            "email",
            "password",
            "role",
            "phone",
            "gender",
            "address",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      include: {
        model: books,
        as: "books",
        attributes: {
          exclude: ["bookId", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["userId", "bookId", "createdAt", "updatedAt"],
      },
    });

    list = JSON.parse(JSON.stringify(list));

    list = list.map((item) => {
      return {
        ...item,
      };
    });
    res.send({
      status: "success",
      data: { booklists: list },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
