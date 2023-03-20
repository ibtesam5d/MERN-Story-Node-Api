const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

// @desc   register users
// @method POST
// @route  /api/auth
router.post("/register", register);

// @desc   login users
// @method POST
// @route  /api/auth
router.post("/login", login);

// @desc   logout users
// @method POST
// @route  /api/auth
router.post("/logout", logout);

module.exports = router;
