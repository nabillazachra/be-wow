const express = require("express");

const router = express.Router();

const { auth } = require("../../middlewares/auth");

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
router.post("/book", auth, addBook);
router.get("/books", getBooks);
router.get("/book/:id", getBook);

//controllers auth
const { register, login } = require("../controllers/auth");

//init route controller auth
router.post("/register", register);
router.post("/login", login);

module.exports = router;
