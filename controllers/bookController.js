const createError = require("../utils/createError.js");
const Book = require("../models/bookModel.js");
// @desc  GET all books
// @route /api/books
// @access private
const getAllBooks = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.category && { category: q.category }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    // getting all books
    const books = await Book.find(filters);
    // check if books exist
    if (!books) return next(createError(404, "you have no books"));
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// @desc   POST a new book
// @route  /api/books
// @access private
const createBook = async (req, res, next) => {
  if (!req.isAuthor)
    return next(createError(403, "you need to become an author to add a book"));

  try {
    const newBook = await Book.create({
      userId: req.userId,
      ...req.body,
    });

    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

// @desc  GET a single book
// @route /api/books/single/:id
// @access private
const getBook = async (req, res, next) => {
  try {
    // getting the book
    const book = await Book.findById(req.params.id);
    // check if book exists
    if (!book)
      return next(
        createError(404, "your requested book not found, please try again")
      );

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// @desc   DELETE a book
// @route  /api/books/:id
// @access private
const deleteBook = async (req, res, next) => {
  try {
    // getting the book to delete
    const book = await Book.findById(req.params.id);
    // checking if correct author
    if (book.userId !== req.userId)
      return next(createError(403, "you can only delete your own books"));

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send(`book ${book.title} is deleted successfully`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
};
