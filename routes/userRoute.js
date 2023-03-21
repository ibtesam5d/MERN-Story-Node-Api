const express = require("express");
const router = express.Router();
const { deleteUser, getUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/jwt.js");

// @desc   delete user account
// @method DELETE
// @route  /api/users
router.delete("/:id", verifyToken, deleteUser);

// @desc   GET user account
// @route  /api/users/:id
// @access private
router.get("/:id", verifyToken, getUser);

module.exports = router;
