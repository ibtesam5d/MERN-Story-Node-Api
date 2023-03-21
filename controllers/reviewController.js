const Review = require("../models/reviewModel");
const Book = require("../models/bookModel");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

// @desc   POST review
// @route  /api/reviews
// @access private
const createReview = async (req, res, next) => {
  if (req.isAuthor)
    return next(createError(403, "Authors can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    bookId: req.body.bookId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      bookId: req.body.bookId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this book!")
      );

    //TODO: check if the user purchased the book.

    const savedReview = await newReview.save();

    await Book.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  deleteReview,
  getReviews,
};
