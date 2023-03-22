const Order = require("../models/orderModel");
const Book = require("../models/bookModel");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const Stripe = require("stripe");

// @desc   POST payment intent
// @route  /api/orders/create-payment-intent/:id
// @access private
const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const book = await Book.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: book.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    bookId: book._id,
    img: book.cover,
    title: book.title,
    buyerId: req.userId,
    authorId: book.userId,
    price: book.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isAuthor ? { authorId: req.userId } : { buyerId: req.userId }),
      isComplete: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isComplete: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  intent,
  getOrders,
  confirm,
};
