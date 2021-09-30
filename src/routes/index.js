const express = require("express");

const router = express.Router();

//Controller user
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

//init route controller user
router.post("/user", addUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

//Controller books
const { addBook, getBooks, getBook } = require("../controllers/books");

//init route controller books
router.post("/book", addBook);
router.get("/books", getBooks);
router.get("/book/:id", getBook);

module.exports = router;
