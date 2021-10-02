const express = require("express");

const router = express.Router();

const { auth } = require("../middlewares/auth");

const { uploadFile } = require("../middlewares/uploadFile");

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
const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

//init route controller books
router.post("/book", auth, uploadFile("bookFile"), addBook);
router.get("/books", getBooks);
router.get("/book/:id", getBook);
router.patch("/book/:id", auth, uploadFile("bookFile"), updateBook);
router.delete("/book/:id", auth, deleteBook);

//controllers auth
const { register, login } = require("../controllers/auth");

//init route controller auth
router.post("/register", register);
router.post("/login", login);

//controllers transactions
const {
  addTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
} = require("../controllers/transaction");

//init route controller transactions
router.post("/transaction", auth, uploadFile("transferProof"), addTransaction);
router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.patch("/transaction/:id", auth, updateTransaction);

module.exports = router;
