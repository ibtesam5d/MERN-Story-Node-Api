const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController.js");
const verifyToken = require("../middlewares/jwt.js");

// @desc   POST review
// @route  /api/reviews
// @access private
router.post("/", verifyToken, createReview);

// @desc   GET reviews
// @route  /api/reviews
// @access public
router.get("/:bookId", getReviews);

// @desc   DELETE review
// @route  /api/reviews
// @access private
router.delete("/:id", deleteReview);

module.exports = router;
