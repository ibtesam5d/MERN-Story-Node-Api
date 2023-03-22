const express = require("express");
const router = express.Router();
const {
  getOrders,
  intent,
  confirm,
} = require("../controllers/orderController");
const verifyToken = require("../middlewares/jwt.js");

// @desc   GET orders
// @route  /api/orders
// @access private
router.get("/", verifyToken, getOrders);

// @desc   POST payment intent
// @route  /api/orders
// @access private
router.post("/create-payment-intent/:id", verifyToken, intent);

// @desc   PUT order
// @route  /api/orders
// @access private
router.put("/", verifyToken, confirm);

// router.post("/:bookId", verifyToken, createOrder);
module.exports = router;
