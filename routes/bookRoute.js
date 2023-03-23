const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  createBook,
  getBook,
  deleteBook,
} = require("../controllers/bookController");
const verifyToken = require("../middlewares/jwt");

// @desc  GET all books
// @route /api/books
// @access public
router.get("/", getAllBooks);

// @desc   POST a new book
// @route  /api/books
// @access private
router.post("/", verifyToken, createBook);

// @desc  GET a single book
// @route /api/books
// @access private
router.get("/single/:id", getBook);

// @desc   DELETE a book
// @route  /api/books
// @access private
router.delete("/:id", verifyToken, deleteBook);

module.exports = router;
