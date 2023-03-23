const express = require("express");
const router = express.Router();
const { deleteUser, getUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/jwt.js");

// @desc   DELETE user account
// @route  /api/users
// @access private
router.delete("/:id", verifyToken, deleteUser);

// @desc   GET user account
// @route  /api/users/:id
// @access public
router.get("/:id", getUser);

module.exports = router;
